# TODO - Mejoras Indoor Navigation App

## Auto-escalado Inteligente + Solución de Superposición GPS

- [x] **MapViewer.jsx**: Implementar auto-escalado inteligente que detecta dispositivo móvil, mide el tamaño real del contenedor, aplica zoom 1.8x y centra el plano vertical y horizontalmente.
- [x] **IndoorNavigator.jsx**: Eliminar el botón GPS flotante grande e integrar un radar GPS pequeño en la cabecera (junto al botón de tema), mostrando el estado de conexión como subtítulo del encabezado.
- [x] **index.css**: Añadir estilos para el radar GPS compacto y el subtítulo de estado GPS.
- [x] Ejecutar `npm run build` y verificar que no haya errores de lint/build.

## Pendientes previos

- [ ] Implementar GPS en tiempo real usando `navigator.geolocation.watchPosition`, obtener lat/lng y convertir a Floor/entrada (aproximación por zona) para actualizar `userLocation` y re-calcular ruta.
- [ ] Asegurar que el marcador del usuario se actualice solo en el piso activo (y manejar permisos/errores de GPS).
- [x] Corregir sobreposición de nombres en SVG (ajuste de offset del texto para etiquetas de habitaciones, incluyendo baños).
