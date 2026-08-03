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
  // Coordenadas “centro” del edificio (placeholder). Ideal: reemplazar por coordenadas reales.
  buildingCenterLat = -19.0,
  buildingCenterLng = -65.0,
  // Umbral aproximado (en metros) para considerar que estás dentro.
  insideThresholdMeters = 80,
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

    // “floor/entrada” por zona (placeholder)
    const inferFloor = ({ lat, lng }) => {
      // Ejemplo: si estás más “al norte” -> PB; si más “al sur” -> Piso 1, etc.
      // Esto NO es preciso sin calibración.
      const dLat = lat - buildingCenterLat;

      if (dLat > 0.0004) return { floor: 'PB', entryName: 'Ingreso Principal' };
      if (dLat > 0.0000) return { floor: '1', entryName: 'Vestíbulo' };
      if (dLat > -0.0004) return { floor: '2', entryName: 'Escalera Derecha (PB)' };
      return { floor: '3', entryName: 'Escalera Izquierda (PB)' };
    };

    let watchId = null;

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        const dist = haversineMeters(lat, lng, buildingCenterLat, buildingCenterLng);
        const inside = dist <= insideThresholdMeters && acc <= 200; // umbral adicional por precisión

        if (!inside) return;

        const inferred = inferFloor({ lat, lng });

        // Convertimos a coordenadas internas del SVG mediante mapeo “aproximado”
        // usando el nodo más representativo de cada piso.
        // Puedes ajustar esto a coordenadas reales (por ejemplo, ubicar 1-2 anclas por piso).
        onGpsUpdate?.({
          lat,
          lng,
          accuracy: acc,
          floor: inferred.floor,
          entryName: inferred.entryName,
          // Posición interna aproximada (se usará para mover el marcador en el plano)
          // Mantener un punto fijo por piso para que el marcador no “salte” erráticamente.
          // (Se puede mejorar con IMU/pasos o calibración real.)
          internalX: null,
          internalY: null,
        });
      },
      (err) => {
        onGpsError?.(err.message || 'Error de GPS');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    return () => {
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
    };
  }, [enabled, onGpsUpdate, onGpsError, buildingCenterLat, buildingCenterLng, insideThresholdMeters]);

  return null;
}

