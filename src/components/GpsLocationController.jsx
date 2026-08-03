import React, { useEffect } from 'react';

/**
 * Controla la geolocalización en tiempo real y notifica al padre.
 *
 * NOTA: Este proyecto es un mapa indoor (SVG con coordenadas internas).
 * Para “floor/entrada” hacemos una aproximación simple por lat/lng:
 * - Si está cerca del edificio (coordenadas simuladas/placeholder), definimos floor.
 * - Si el GPS falla o el usuario está lejos, no actualizamos.
 *
 * Cambia los rangos/centro con datos reales cuando se disponga de calibración.
 */
export default function GpsLocationController({
  enabled,
  onGpsUpdate,
  onGpsError,
  // Coordenadas reales aproximadas de la Carrera de Turismo - USFX en Sucre, Bolivia
  buildingCenterLat = -19.050278,
  buildingCenterLng = -65.260556,
  insideThresholdMeters = 150,
}) {
  useEffect(() => {
    if (!enabled) return;
    if (!('geolocation' in navigator)) {
      onGpsError?.('Geolocalización no soportada en este navegador.');
      return;
    }

    const toRad = (v) => (v * Math.PI) / 180;
    const haversineMeters = (lat1, lon1, lat2, lon2) => {
      const R = 6371000;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    let firstPosition = null;
    let watchId = null;

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        const dist = haversineMeters(lat, lng, buildingCenterLat, buildingCenterLng);
        // Si está a menos de 300 metros, mapeo absoluto. De lo contrario, mapeo relativo para demo.
        const isNearBuilding = dist <= 300;

        let internalX, internalY;
        let floor = 'PB';
        let entryName = '';

        if (isNearBuilding) {
          // Bounding Box para la Carrera de Turismo (aprox 120m de ancho x 60m de alto)
          const latMin = -19.0507;
          const latMax = -19.0498;
          const lngMin = -65.2611;
          const lngMax = -65.2600;

          // Porcentaje de posición en el bounding box [0, 1]
          const pctX = Math.max(0, Math.min(1, (lng - lngMin) / (lngMax - lngMin)));
          const pctY = Math.max(0, Math.min(1, 1 - (lat - latMin) / (latMax - latMin)));

          // Mapeo lineal a las dimensiones internas del mapa (1020 x 480)
          internalX = 80 + pctX * (940 - 80);
          internalY = 50 + pctY * (430 - 50);

          // Inferir planta aproximada por latitud
          if (pctY > 0.6) {
            floor = 'PB';
            entryName = 'Ingreso Principal';
          } else if (pctY > 0.4) {
            floor = '1';
            entryName = 'Primer Piso';
          } else if (pctY > 0.2) {
            floor = '2';
            entryName = 'Segundo Piso';
          } else {
            floor = '3';
            entryName = 'Tercer Piso';
          }
        } else {
          // Modo Demo (Mapeo relativo al primer punto capturado)
          if (!firstPosition) {
            firstPosition = { lat, lng };
          }

          const deltaLat = lat - firstPosition.lat;
          const deltaLng = lng - firstPosition.lng;

          // Grados a metros aproximados
          const metersX = deltaLng * 111320 * Math.cos(toRad(lat));
          const metersY = deltaLat * 111000;

          // Escalamiento (1m de movimiento físico = 10 píxeles de movimiento en el mapa)
          // Partimos del centro del mapa (510, 240)
          internalX = Math.max(80, Math.min(940, 510 + metersX * 10));
          internalY = Math.max(50, Math.min(430, 240 - metersY * 10)); // Y invertido en SVG
          
          floor = 'PB';
          entryName = 'GPS Relativo (Modo Demo)';
        }

        onGpsUpdate?.({
          lat,
          lng,
          accuracy: acc,
          floor,
          entryName,
          internalX,
          internalY,
          isRelative: !isNearBuilding
        });
      },
      (err) => {
        onGpsError?.(err.message || 'Error de GPS');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 15000,
      }
    );

    return () => {
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
    };
  }, [enabled, onGpsUpdate, onGpsError, buildingCenterLat, buildingCenterLng, insideThresholdMeters]);

  return null;
}

