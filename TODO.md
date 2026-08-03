# TODO - Mejoras Indoor Navigation App

- [ ] Implementar GPS en tiempo real usando `navigator.geolocation.watchPosition`, obtener lat/lng y convertir a Floor/entrada (aproximación por zona) para actualizar `userLocation` y re-calcular ruta.
- [ ] Asegurar que el marcador del usuario se actualice solo en el piso activo (y manejar permisos/errores de GPS).
- [x] Corregir sobreposición de nombres en SVG (ajuste de offset del texto para etiquetas de habitaciones, incluyendo baños).
- [ ] Ejecutar `npm run dev` / `npm run build` y verificar que no haya errores de lint/build.


