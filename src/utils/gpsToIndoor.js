// Conversión aproximada GPS -> floor/entrada + posición interna (placeholder)
// Este proyecto usa un plano indoor SVG; sin calibración de lat/lng a coordenadas internas
// no es posible un “tiempo real” exacto en el plano.
//
// Este módulo provee helpers para:
// - Inferir floor/entrada por zona (coordenadas aproximadas)
// - Convertir a coordenadas internas usando anclas por piso (placeholder)

const toRad = (v) => (v * Math.PI) / 180;

export function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function inferFloorFromLatLng({ lat, lng, buildingCenterLat, buildingCenterLng }) {
  // Placeholder heurístico (reemplazar con calibración real)
  const dLat = lat - buildingCenterLat;

  if (dLat > 0.0004) return { floor: 'PB', entryName: 'Ingreso Principal' };
  if (dLat > 0.0000) return { floor: '1', entryName: 'Vestíbulo' };
  if (dLat > -0.0004) return { floor: '2', entryName: 'Escalera Derecha (PB)' };
  return { floor: '3', entryName: 'Escalera Izquierda (PB)' };
}

// Retorna coordenadas internas (X,Y) aproximadas por piso.
// Por ahora fija un punto “representativo” por piso (para evitar saltos).
export function getIndoorAnchorForFloor(floor) {
  switch (floor) {
    case 'PB':
      return { x: 940, y: 360 };
    case '1':
      return { x: 790, y: 290 };
    case '2':
      return { x: 790, y: 290 };
    case '3':
      return { x: 490, y: 245 };
    default:
      return { x: 940, y: 360 };
  }
}

