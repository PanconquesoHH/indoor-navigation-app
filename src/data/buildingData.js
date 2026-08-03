// Datos detallados del edificio de la Carrera de Turismo - USFX
// Dividido en 4 plantas: Planta Baja, Primer Piso, Segundo Piso y Tercer Piso

export const floors = [
  { id: 'PB', name: 'Planta Baja', shortName: 'PB' },
  { id: '1', name: 'Primer Piso', shortName: '1º' },
  { id: '2', name: 'Segundo Piso', shortName: '2º' },
  { id: '3', name: 'Tercer Piso', shortName: '3º' }
];

export const rooms = [
  // PLANTA BAJA
  {
    id: 'auditorio',
    name: 'Auditorio',
    shortName: 'Auditorio',
    code: 'AB1',
    floor: 'PB',
    category: 'auditorio',
    description: 'Auditorio principal para conferencias, defensas y actos académicos de la carrera.',
    details: 'Equipado con sistema de sonido, proyector de alta definición y capacidad para 120 personas.',
    tags: ['auditorio', 'teatro', 'conferencias', 'actos', 'ab1'],
    x: 860, y: 80, w: 120, h: 200, door: { x: 860, y: 180 }
  },
  {
    id: 'cabina_control',
    name: 'Cabina de Control',
    shortName: 'Control',
    code: 'AB2',
    floor: 'PB',
    category: 'servicio',
    description: 'Cabina de sonido y luces del auditorio.',
    details: 'Acceso restringido a personal técnico.',
    tags: ['control', 'cabina', 'sonido', 'luces', 'ab2'],
    x: 810, y: 80, w: 40, h: 60, door: { x: 810, y: 120 }
  },
  {
    id: 'sala_docente',
    name: 'Sala Docente',
    shortName: 'Sala Docente',
    code: 'AB3',
    floor: 'PB',
    category: 'oficina',
    description: 'Espacio de descanso y reunión para los docentes de la Carrera de Turismo.',
    details: 'Cuenta con mesas de trabajo, casilleros e internet para los profesores.',
    tags: ['sala docente', 'profesores', 'docentes', 'ab3'],
    x: 640, y: 80, w: 160, h: 120, door: { x: 720, y: 200 }
  },
  {
    id: 'control_biometrico',
    name: 'Control Biométrico',
    shortName: 'Biométrico',
    code: 'AB4',
    floor: 'PB',
    category: 'servicio',
    description: 'Marcador biométrico de asistencia para docentes y administrativos.',
    details: 'Ubicado en el pasillo central de la planta baja, junto a la Sala Docente.',
    tags: ['biometrico', 'marcador', 'asistencia', 'reloj', 'ab4'],
    x: 600, y: 140, w: 30, h: 40, door: { x: 615, y: 180 }
  },
  {
    id: 'cafeteria',
    name: 'Cafetería',
    shortName: 'Café',
    code: 'AB5',
    floor: 'PB',
    category: 'comida',
    description: 'Cafetería del edificio de Turismo.',
    details: 'Ofrece refrigerios, almuerzos rápidos y bebidas. Horario de atención: 07:30 - 20:00.',
    tags: ['cafeteria', 'comida', 'snack', 'cafe', 'ab5', 'almuerzo'],
    x: 360, y: 300, w: 110, h: 110, door: { x: 415, y: 300 }
  },
  {
    id: 'porteria',
    name: 'Portería / Seguridad',
    shortName: 'Portería',
    code: 'AB6',
    floor: 'PB',
    category: 'servicio',
    description: 'Oficina de recepción, información y seguridad del edificio.',
    details: 'Aquí se pueden consultar llaves de aulas y reportar objetos perdidos.',
    tags: ['porteria', 'seguridad', 'informacion', 'recepcion', 'ab6'],
    x: 240, y: 300, w: 110, h: 110, door: { x: 295, y: 300 }
  },
  {
    id: 'gabinete_sabre',
    name: 'Gabinete (SABRE)',
    shortName: 'SABRE',
    code: 'AB7',
    floor: 'PB',
    category: 'laboratorio',
    description: 'Gabinete de simulaciones turísticas equipado con el sistema de reservas SABRE.',
    details: 'Espacio de aprendizaje práctico para sistemas de reservas aéreas, hoteleras y servicios turísticos.',
    tags: ['sabre', 'gabinete', 'sistema', 'reservas', 'ab7', 'computadoras'],
    x: 100, y: 80, w: 140, h: 100, door: { x: 170, y: 180 }
  },
  {
    id: 'centro_estudiantes',
    name: 'Centro de Estudiantes',
    shortName: 'C. Est.',
    code: 'AB8',
    floor: 'PB',
    category: 'oficina',
    description: 'Oficina de la representación estudiantil de la Carrera de Turismo - USFX.',
    details: 'Espacio para consultas de estudiantes, becas y trámites gremiales.',
    tags: ['centro de estudiantes', 'estudiantes', 'representacion', 'ab8', 'dirigentes'],
    x: 100, y: 300, w: 130, h: 110, door: { x: 165, y: 300 }
  },
  {
    id: 'fotocopias',
    name: 'Fotocopiadora',
    shortName: 'Fotocop.',
    code: 'A1_F',
    floor: 'PB',
    category: 'servicio',
    description: 'Servicio de fotocopias, impresiones y anillados.',
    details: 'Venta de material de avance, apuntes de materias y papelería general.',
    tags: ['fotocopias', 'fotocopiadora', 'impresiones', 'apuntes', 'anillados'],
    x: 760, y: 200, w: 60, h: 40, door: { x: 760, y: 220 }
  },
  {
    id: 'baño_mujeres_pb',
    name: 'Baño de Mujeres (PB)',
    shortName: 'Baño M.',
    code: 'A2_BM',
    floor: 'PB',
    category: 'baño',
    description: 'Servicios higiénicos públicos para mujeres - Planta Baja.',
    details: 'Ubicado en el pasillo principal, frente a la cafetería.',
    tags: ['baño', 'mujeres', 'sanitarios', 'wc', 'chicas', 'a2'],
    x: 500, y: 80, w: 45, h: 60, door: { x: 522, y: 140 }
  },
  {
    id: 'baño_hombres_pb',
    name: 'Baño de Hombres (PB)',
    shortName: 'Baño H.',
    code: 'A3_BH',
    floor: 'PB',
    category: 'baño',
    description: 'Servicios higiénicos públicos para hombres - Planta Baja.',
    details: 'Ubicado al lado del baño de mujeres en el pasillo central.',
    tags: ['baño', 'hombres', 'sanitarios', 'wc', 'chicos', 'a3'],
    x: 550, y: 80, w: 45, h: 60, door: { x: 572, y: 140 }
  },
  {
    id: 'ingreso_principal',
    name: 'Ingreso Principal',
    shortName: 'Ingreso',
    code: 'ING',
    floor: 'PB',
    category: 'comunes',
    description: 'Entrada principal al edificio sobre la acera Francisco Xavier de Chuquisaca.',
    details: 'Acceso peatonal principal.',
    tags: ['ingreso', 'entrada', 'calle', 'acera', 'salida', 'puerta'],
    x: 940, y: 320, w: 50, h: 80, door: { x: 940, y: 360 }
  },
  {
    id: 'vestibulo',
    name: 'Vestíbulo',
    shortName: 'Vestíbulo',
    code: 'VES',
    floor: 'PB',
    category: 'comunes',
    description: 'Área de distribución de la entrada principal del edificio.',
    details: 'Conecta al auditorio, la fotocopiadora, la escalera derecha y el pasillo principal.',
    tags: ['vestibulo', 'hall', 'entrada', 'recepcion'],
    x: 740, y: 240, w: 100, h: 100, door: { x: 790, y: 290 }
  },
  {
    id: 'area_sin_designar_pb',
    name: 'Área sin Designar (PB)',
    shortName: 'Área Libre',
    code: 'ASD_PB',
    floor: 'PB',
    category: 'comunes',
    description: 'Espacio de depósito o futura aula en planta baja.',
    details: 'Cerrado al público por el momento.',
    tags: ['deposito', 'vacio', 'designar'],
    x: 330, y: 80, w: 160, h: 130, door: { x: 410, y: 210 }
  },
  {
    id: 'escalera_izq_pb',
    name: 'Escalera Izquierda (PB)',
    shortName: 'Esc. Izq.',
    code: 'A4_EI',
    floor: 'PB',
    category: 'escalera',
    description: 'Escalera del ala izquierda del edificio.',
    details: 'Conecta todos los niveles del edificio (Planta Baja, 1º, 2º y 3º Piso).',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'izquierda', 'a4'],
    x: 250, y: 120, w: 70, h: 80, door: { x: 285, y: 160 }
  },
  {
    id: 'escalera_der_pb',
    name: 'Escalera Derecha (PB)',
    shortName: 'Esc. Der.',
    code: 'A4_ED',
    floor: 'PB',
    category: 'escalera',
    description: 'Escalera del ala derecha del edificio (Vestíbulo).',
    details: 'Conecta los niveles: Planta Baja, 1º Piso y 2º Piso.',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'derecha', 'a4'],
    x: 640, y: 260, w: 70, h: 80, door: { x: 675, y: 300 }
  },

  // PRIMER PISO
  {
    id: 'aula_103',
    name: 'Aula A-103',
    shortName: 'A-103',
    code: 'AB4_103',
    floor: '1',
    category: 'aula',
    description: 'Aula de teoría de primer nivel - Ala Izquierda.',
    details: 'Utilizada para asignaturas de pregrado de la carrera.',
    tags: ['aula 103', 'a-103', 'clases', 'teoria', 'ab4'],
    x: 100, y: 80, w: 140, h: 100, door: { x: 170, y: 180 }
  },
  {
    id: 'defensa_grado',
    name: 'Defensa de Grado',
    shortName: 'Defensa',
    code: 'AB6_DG',
    floor: '1',
    category: 'aula',
    description: 'Aula especial habilitada para defensas de tesis y exámenes de grado.',
    details: 'Cuenta con mobiliario formal, pódium y proyector multimedia.',
    tags: ['defensa de grado', 'tesis', 'examen', 'ab6', 'grado'],
    x: 100, y: 300, w: 130, h: 110, door: { x: 165, y: 300 }
  },
  {
    id: 'aula_101',
    name: 'Aula A-101',
    shortName: 'A-101',
    code: 'AB2_101',
    floor: '1',
    category: 'aula',
    description: 'Aula teórica - Primer Piso Centro.',
    details: 'Capacidad para 50 estudiantes. Equipada con pizarrón y proyector.',
    tags: ['aula 101', 'a-101', 'clases', 'ab2'],
    x: 330, y: 80, w: 160, h: 130, door: { x: 410, y: 210 }
  },
  {
    id: 'aula_104',
    name: 'Aula A-104',
    shortName: 'A-104',
    code: 'AB5_104',
    floor: '1',
    category: 'aula',
    description: 'Aula de teoría - Primer Piso Centro-Izquierda.',
    details: 'Capacidad para 40 estudiantes.',
    tags: ['aula 104', 'a-104', 'clases', 'ab5', 'b3'],
    x: 240, y: 300, w: 110, h: 110, door: { x: 295, y: 300 }
  },
  {
    id: 'aula_102',
    name: 'Aula A-102',
    shortName: 'A-102',
    code: 'AB3_102',
    floor: '1',
    category: 'aula',
    description: 'Aula teórica - Primer Piso Centro-Derecha.',
    details: 'Capacidad para 55 estudiantes.',
    tags: ['aula 102', 'a-102', 'clases', 'ab3'],
    x: 360, y: 300, w: 160, h: 110, door: { x: 440, y: 300 }
  },
  {
    id: 'direccion',
    name: 'Dirección de Carrera',
    shortName: 'Dirección',
    code: 'AB1_DIR',
    floor: '1',
    category: 'oficina',
    description: 'Oficina de la Dirección de la Carrera de Turismo.',
    details: 'Atención al público en horarios administrativos: 08:00 - 12:00, 14:00 - 18:00.',
    tags: ['direccion', 'director', 'oficina', 'jefe', 'ab1', 'a3'],
    x: 640, y: 80, w: 90, h: 120, door: { x: 670, y: 200 }
  },
  {
    id: 'secretaria',
    name: 'Secretaría de Dirección',
    shortName: 'Secretaría',
    code: 'AB1_SEC',
    floor: '1',
    category: 'oficina',
    description: 'Secretaría y recepción de documentos para Dirección.',
    details: 'Trámites de correspondencia oficial e informes.',
    tags: ['secretaria', 'oficina', 'recepcion', 'ab1', 'a5'],
    x: 740, y: 140, w: 60, h: 60, door: { x: 740, y: 170 }
  },
  {
    id: 'kardex',
    name: 'Kardex Académico',
    shortName: 'Kardex',
    code: 'AB1_KAR',
    floor: '1',
    category: 'oficina',
    description: 'Oficina de Kardex Académico - Control de Notas y Archivos.',
    details: 'Trámites de inscripciones, certificados de notas y expedientes de estudiantes.',
    tags: ['kardex', 'notas', 'certificados', 'expedientes', 'tramites', 'ab1', 'a4'],
    x: 740, y: 80, w: 60, h: 60, door: { x: 770, y: 140 }
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca de Turismo',
    shortName: 'Biblioteca',
    code: 'A2_BIB',
    floor: '1',
    category: 'biblioteca',
    description: 'Biblioteca especializada en temas de turismo, hotelería y gastronomía.',
    details: 'Espacio de estudio silencioso y préstamo de libros con credencial universitaria.',
    tags: ['biblioteca', 'libros', 'estudio', 'silencio', 'a2', 'lectura'],
    x: 820, y: 80, w: 160, h: 180, door: { x: 820, y: 180 }
  },
  {
    id: 'gabinete_informatica',
    name: 'Gabinete de Informática',
    shortName: 'G. Inform.',
    code: 'A1_GI',
    floor: '1',
    category: 'laboratorio',
    description: 'Laboratorio de computación para uso general de estudiantes y asignaturas prácticas.',
    details: 'Equipado con 30 ordenadores con acceso a internet e impresoras.',
    tags: ['gabinete', 'informatica', 'computadoras', 'internet', 'laboratorio', 'a1'],
    x: 720, y: 300, w: 130, h: 110, door: { x: 750, y: 300 }
  },
  {
    id: 'baño_mujeres_p1',
    name: 'Baño de Mujeres (1º Piso)',
    shortName: 'Baño M.',
    code: 'A7_BM',
    floor: '1',
    category: 'baño',
    description: 'Servicios higiénicos públicos para mujeres - Primer Piso.',
    details: 'Ubicado en el pasillo central.',
    tags: ['baño', 'mujeres', 'sanitarios', 'wc', 'a7'],
    x: 500, y: 80, w: 45, h: 60, door: { x: 522, y: 140 }
  },
  {
    id: 'baño_hombres_p1',
    name: 'Baño de Hombres (1º Piso)',
    shortName: 'Baño H.',
    code: 'A8_BH',
    floor: '1',
    category: 'baño',
    description: 'Servicios higiénicos públicos para hombres - Primer Piso.',
    details: 'Ubicado al lado del baño de mujeres.',
    tags: ['baño', 'hombres', 'sanitarios', 'wc', 'a8'],
    x: 550, y: 80, w: 45, h: 60, door: { x: 572, y: 140 }
  },
  {
    id: 'deposito_1',
    name: 'Depósito 1',
    shortName: 'Dep. 1',
    code: 'A6_DP1',
    floor: '1',
    category: 'servicio',
    description: 'Espacio de almacenamiento de equipos y suministros.',
    details: 'Acceso restringido.',
    tags: ['deposito', 'almacen', 'a6', 'b1'],
    x: 600, y: 80, w: 35, h: 60, door: { x: 615, y: 140 }
  },
  {
    id: 'escalera_izq_p1',
    name: 'Escalera Izquierda (1º Piso)',
    shortName: 'Esc. Izq.',
    code: 'A9_EI',
    floor: '1',
    category: 'escalera',
    description: 'Conexión vertical - Ala Izquierda.',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'izquierda', 'a9'],
    x: 250, y: 120, w: 70, h: 80, door: { x: 285, y: 160 }
  },
  {
    id: 'escalera_der_p1',
    name: 'Escalera Derecha (1º Piso)',
    shortName: 'Esc. Der.',
    code: 'A9_ED',
    floor: '1',
    category: 'escalera',
    description: 'Conexión vertical - Ala Derecha.',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'derecha', 'a9'],
    x: 640, y: 260, w: 70, h: 80, door: { x: 675, y: 300 }
  },

  // SEGUNDO PISO
  {
    id: 'aula_203',
    name: 'Aula A-203',
    shortName: 'A-203',
    code: 'AB5_203',
    floor: '2',
    category: 'aula',
    description: 'Aula teórica - Segundo Piso Ala Izquierda.',
    details: 'Capacidad para 45 estudiantes.',
    tags: ['aula 203', 'a-203', 'clases', 'ab5'],
    x: 100, y: 80, w: 140, h: 100, door: { x: 170, y: 180 }
  },
  {
    id: 'aula_205',
    name: 'Aula A-205',
    shortName: 'A-205',
    code: 'AB7_205',
    floor: '2',
    category: 'aula',
    description: 'Aula teórica - Segundo Piso Ala Izquierda Inferior.',
    details: 'Capacidad para 35 estudiantes.',
    tags: ['aula 205', 'a-205', 'clases', 'ab7'],
    x: 100, y: 300, w: 130, h: 110, door: { x: 165, y: 300 }
  },
  {
    id: 'aula_201',
    name: 'Aula A-201',
    shortName: 'A-201',
    code: 'AB3_201',
    floor: '2',
    category: 'aula',
    description: 'Aula teórica - Segundo Piso Centro Superior.',
    details: 'Capacidad para 50 estudiantes.',
    tags: ['aula 201', 'a-201', 'clases', 'ab3', 'b1'],
    x: 330, y: 80, w: 160, h: 130, door: { x: 410, y: 210 }
  },
  {
    id: 'aula_204',
    name: 'Aula A-204',
    shortName: 'A-204',
    code: 'AB6_204',
    floor: '2',
    category: 'aula',
    description: 'Aula teórica - Segundo Piso Centro-Izquierda.',
    details: 'Capacidad para 40 estudiantes.',
    tags: ['aula 204', 'a-204', 'clases', 'ab6', 'b2'],
    x: 240, y: 300, w: 110, h: 110, door: { x: 295, y: 300 }
  },
  {
    id: 'aula_202',
    name: 'Aula A-202',
    shortName: 'A-202',
    code: 'AB4_202',
    floor: '2',
    category: 'aula',
    description: 'Aula teórica - Segundo Piso Centro-Derecha.',
    details: 'Capacidad para 55 estudiantes.',
    tags: ['aula 202', 'a-202', 'clases', 'ab4'],
    x: 360, y: 300, w: 160, h: 110, door: { x: 440, y: 300 }
  },
  {
    id: 'baño_mujeres_p2',
    name: 'Baño de Mujeres (2º Piso)',
    shortName: 'Baño M.',
    code: 'A2_BM',
    floor: '2',
    category: 'baño',
    description: 'Servicios higiénicos para mujeres - Segundo Piso.',
    tags: ['baño', 'mujeres', 'sanitarios', 'wc', 'a2'],
    x: 500, y: 80, w: 45, h: 60, door: { x: 522, y: 140 }
  },
  {
    id: 'baño_hombres_p2',
    name: 'Baño de Hombres (2º Piso)',
    shortName: 'Baño H.',
    code: 'A3_BH',
    floor: '2',
    category: 'baño',
    description: 'Servicios higiénicos para hombres - Segundo Piso.',
    tags: ['baño', 'hombres', 'sanitarios', 'wc', 'a3'],
    x: 550, y: 80, w: 45, h: 60, door: { x: 572, y: 140 }
  },
  {
    id: 'deposito_2',
    name: 'Depósito 2',
    shortName: 'Dep. 2',
    code: 'AB1_DP2',
    floor: '2',
    category: 'servicio',
    description: 'Depósito de insumos del segundo piso.',
    tags: ['deposito', 'ab1'],
    x: 600, y: 80, w: 35, h: 60, door: { x: 615, y: 140 }
  },
  {
    id: 'deposito_3',
    name: 'Depósito 3',
    shortName: 'Dep. 3',
    code: 'AB2_DP3',
    floor: '2',
    category: 'servicio',
    description: 'Depósito adicional.',
    tags: ['deposito', 'ab2'],
    x: 640, y: 80, w: 35, h: 60, door: { x: 655, y: 140 }
  },
  {
    id: 'area_sin_designar_p2',
    name: 'Área sin Designar (2º Piso)',
    shortName: 'Área Libre',
    code: 'ASD_P2',
    floor: '2',
    category: 'comunes',
    description: 'Espacio libre o multifuncional en el ala derecha.',
    tags: ['vacio', 'designar'],
    x: 680, y: 80, w: 180, h: 120, door: { x: 740, y: 200 }
  },
  {
    id: 'terraza_p2',
    name: 'Terraza (2º Piso)',
    shortName: 'Terraza',
    code: 'A1_TZ',
    floor: '2',
    category: 'comunes',
    description: 'Terraza exterior con vistas de la ciudad. Espacio de recreación estudiantil.',
    details: 'Espacio al aire libre con barandilla.',
    tags: ['terraza', 'mirador', 'exterior', 'recreo', 'a1'],
    x: 870, y: 80, w: 110, h: 330, door: { x: 870, y: 240 }
  },
  {
    id: 'escalera_izq_p2',
    name: 'Escalera Izquierda (2º Piso)',
    shortName: 'Esc. Izq.',
    code: 'A4_EI',
    floor: '2',
    category: 'escalera',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'izquierda', 'a4'],
    x: 250, y: 120, w: 70, h: 80, door: { x: 285, y: 160 }
  },
  {
    id: 'escalera_der_p2',
    name: 'Escalera Derecha (2º Piso)',
    shortName: 'Esc. Der.',
    code: 'A4_ED',
    floor: '2',
    category: 'escalera',
    tags: ['escalera', 'subir', 'bajar', 'gradas', 'derecha', 'a4'],
    x: 640, y: 260, w: 70, h: 80, door: { x: 675, y: 300 }
  },

  // TERCER PISO
  {
    id: 'aula_303',
    name: 'Aula A-303',
    shortName: 'A-303',
    code: 'AB3_303',
    floor: '3',
    category: 'aula',
    description: 'Aula del tercer nivel - Ala Izquierda.',
    details: 'Aula para semestres superiores de la carrera.',
    tags: ['aula 303', 'a-303', 'clases', 'ab3'],
    x: 100, y: 80, w: 140, h: 100, door: { x: 170, y: 180 }
  },
  {
    id: 'aula_304',
    name: 'Aula A-304',
    shortName: 'A-304',
    code: 'AB7_304',
    floor: '3',
    category: 'aula',
    description: 'Aula del tercer nivel - Ala Izquierda Inferior.',
    details: 'Capacidad para 30 alumnos.',
    tags: ['aula 304', 'a-304', 'clases', 'ab7'],
    x: 100, y: 300, w: 130, h: 110, door: { x: 165, y: 300 }
  },
  {
    id: 'aula_301',
    name: 'Aula A-301',
    shortName: 'A-301',
    code: 'AB1_301',
    floor: '3',
    category: 'aula',
    description: 'Aula teórica - Tercer Piso Centro.',
    details: 'Capacidad para 45 estudiantes.',
    tags: ['aula 301', 'a-301', 'clases', 'ab1'],
    x: 330, y: 80, w: 160, h: 130, door: { x: 410, y: 210 }
  },
  {
    id: 'aula_302',
    name: 'Aula A-302',
    shortName: 'A-302',
    code: 'AB2_302',
    floor: '3',
    category: 'aula',
    description: 'Aula teórica - Tercer Piso Centro Inferior.',
    details: 'Capacidad para 40 estudiantes.',
    tags: ['aula 302', 'a-302', 'clases', 'ab2'],
    x: 360, y: 300, w: 160, h: 110, door: { x: 440, y: 300 }
  },
  {
    id: 'terraza_p3',
    name: 'Terraza (3er Piso)',
    shortName: 'Terraza',
    code: 'A1_TZ',
    floor: '3',
    category: 'comunes',
    description: 'Terraza del tercer nivel.',
    details: 'Acceso para esparcimiento, al lado del Aula A-301.',
    tags: ['terraza', 'exterior', 'mirador', 'a1'],
    x: 530, y: 80, w: 120, h: 200, door: { x: 530, y: 180 }
  },
  {
    id: 'escalera_izq_p3',
    name: 'Escalera Izquierda (3er Piso)',
    shortName: 'Esc. Izq.',
    code: 'A4_EI',
    floor: '3',
    category: 'escalera',
    description: 'Única escalera de acceso al 3er Piso en los planos.',
    tags: ['escalera', 'bajar', 'gradas', 'izquierda', 'a4'],
    x: 250, y: 120, w: 70, h: 80, door: { x: 285, y: 160 }
  }
];

// Nodos del Grafo de Navegación para cada Planta
// Conectan puertas de habitaciones, escaleras y puntos intermedios en los pasillos (corridors)
export const graphNodes = {
  // PLANTA BAJA
  'pb_ingreso_principal': { id: 'pb_ingreso_principal', name: 'Ingreso Principal', floor: 'PB', x: 940, y: 360 },
  'pb_vestibulo': { id: 'pb_vestibulo', name: 'Vestíbulo', floor: 'PB', x: 790, y: 290 },
  'pb_auditorio_door': { id: 'pb_auditorio_door', name: 'Puerta Auditorio', floor: 'PB', x: 860, y: 180 },
  'pb_cabina_control_door': { id: 'pb_cabina_control_door', name: 'Puerta Cabina Control', floor: 'PB', x: 810, y: 120 },
  'pb_fotocopias_door': { id: 'pb_fotocopias_door', name: 'Puerta Fotocopiadora', floor: 'PB', x: 760, y: 220 },
  'pb_escalera_der_node': { id: 'pb_escalera_der_node', name: 'Escalera Derecha (Piso PB)', floor: 'PB', x: 675, y: 300, isStairs: true, pairId: 'p1_escalera_der_node' },
  'pb_sala_docente_door': { id: 'pb_sala_docente_door', name: 'Puerta Sala Docente', floor: 'PB', x: 720, y: 200 },
  'pb_control_biometrico_door': { id: 'pb_control_biometrico_door', name: 'Puerta Biométrico', floor: 'PB', x: 615, y: 180 },
  'pb_baño_mujeres_door': { id: 'pb_baño_mujeres_door', name: 'Puerta Baño Mujeres', floor: 'PB', x: 522, y: 140 },
  'pb_baño_hombres_door': { id: 'pb_baño_hombres_door', name: 'Puerta Baño Hombres', floor: 'PB', x: 572, y: 140 },
  'pb_area_sin_designar_door': { id: 'pb_area_sin_designar_door', name: 'Puerta Área sin Designar', floor: 'PB', x: 410, y: 210 },
  'pb_cafeteria_door': { id: 'pb_cafeteria_door', name: 'Puerta Cafetería', floor: 'PB', x: 415, y: 300 },
  'pb_porteria_door': { id: 'pb_porteria_door', name: 'Puerta Portería', floor: 'PB', x: 295, y: 300 },
  'pb_gabinete_sabre_door': { id: 'pb_gabinete_sabre_door', name: 'Puerta Gabinete SABRE', floor: 'PB', x: 170, y: 180 },
  'pb_centro_estudiantes_door': { id: 'pb_centro_estudiantes_door', name: 'Puerta Centro Estudiantes', floor: 'PB', x: 165, y: 300 },
  'pb_escalera_izq_node': { id: 'pb_escalera_izq_node', name: 'Escalera Izquierda (Piso PB)', floor: 'PB', x: 285, y: 160, isStairs: true, pairId: 'p1_escalera_izq_node' },
  'pb_patio_principal': { id: 'pb_patio_principal', name: 'Patio Principal', floor: 'PB', x: 555, y: 355 },
  // Nodos intermedios de pasillos (corridors)
  'pb_pasillo_1': { id: 'pb_pasillo_1', name: 'Pasillo Izquierda', floor: 'PB', x: 170, y: 245 },
  'pb_pasillo_2': { id: 'pb_pasillo_2', name: 'Pasillo Centro-Izquierda', floor: 'PB', x: 285, y: 245 },
  'pb_pasillo_3': { id: 'pb_pasillo_3', name: 'Pasillo Centro', floor: 'PB', x: 415, y: 245 },
  'pb_pasillo_4': { id: 'pb_pasillo_4', name: 'Pasillo Centro-Derecha', floor: 'PB', x: 545, y: 245 },
  'pb_pasillo_5': { id: 'pb_pasillo_5', name: 'Pasillo Administrativos', floor: 'PB', x: 675, y: 245 },
  'pb_pasillo_6': { id: 'pb_pasillo_6', name: 'Pasillo Vestíbulo', floor: 'PB', x: 790, y: 245 },

  // PRIMER PISO
  'p1_aula_103_door': { id: 'p1_aula_103_door', name: 'Puerta Aula A-103', floor: '1', x: 170, y: 180 },
  'p1_defensa_grado_door': { id: 'p1_defensa_grado_door', name: 'Puerta Defensa de Grado', floor: '1', x: 165, y: 300 },
  'p1_escalera_izq_node': { id: 'p1_escalera_izq_node', name: 'Escalera Izquierda (Piso 1)', floor: '1', x: 285, y: 160, isStairs: true, pairId: 'pb_escalera_izq_node', upPairId: 'p2_escalera_izq_node' },
  'p1_aula_101_door': { id: 'p1_aula_101_door', name: 'Puerta Aula A-101', floor: '1', x: 410, y: 210 },
  'p1_aula_104_door': { id: 'p1_aula_104_door', name: 'Puerta Aula A-104', floor: '1', x: 295, y: 300 },
  'p1_aula_102_door': { id: 'p1_aula_102_door', name: 'Puerta Aula A-102', floor: '1', x: 440, y: 300 },
  'p1_baño_mujeres_door': { id: 'p1_baño_mujeres_door', name: 'Puerta Baño Mujeres', floor: '1', x: 522, y: 140 },
  'p1_baño_hombres_door': { id: 'p1_baño_hombres_door', name: 'Puerta Baño Hombres', floor: '1', x: 572, y: 140 },
  'p1_deposito_1_door': { id: 'p1_deposito_1_door', name: 'Puerta Depósito 1', floor: '1', x: 615, y: 140 },
  'p1_direccion_door': { id: 'p1_direccion_door', name: 'Puerta Dirección', floor: '1', x: 670, y: 200 },
  'p1_secretaria_door': { id: 'p1_secretaria_door', name: 'Puerta Secretaría', floor: '1', x: 740, y: 170 },
  'p1_kardex_door': { id: 'p1_kardex_door', name: 'Puerta Kardex', floor: '1', x: 770, y: 140 },
  'p1_biblioteca_door': { id: 'p1_biblioteca_door', name: 'Puerta Biblioteca', floor: '1', x: 820, y: 180 },
  'p1_escalera_der_node': { id: 'p1_escalera_der_node', name: 'Escalera Derecha (Piso 1)', floor: '1', x: 675, y: 300, isStairs: true, pairId: 'pb_escalera_der_node', upPairId: 'p2_escalera_der_node' },
  'p1_gabinete_informatica_door': { id: 'p1_gabinete_informatica_door', name: 'Puerta Gabinete Informática', floor: '1', x: 750, y: 300 },
  // Nodos pasillos primer piso
  'p1_pasillo_1': { id: 'p1_pasillo_1', name: 'Pasillo Izquierda', floor: '1', x: 170, y: 245 },
  'p1_pasillo_2': { id: 'p1_pasillo_2', name: 'Pasillo Centro-Izquierda', floor: '1', x: 285, y: 245 },
  'p1_pasillo_3': { id: 'p1_pasillo_3', name: 'Pasillo Centro', floor: '1', x: 410, y: 245 },
  'p1_pasillo_4': { id: 'p1_pasillo_4', name: 'Pasillo Centro-Derecha', floor: '1', x: 545, y: 245 },
  'p1_pasillo_5': { id: 'p1_pasillo_5', name: 'Pasillo Administrativos', floor: '1', x: 670, y: 245 },
  'p1_pasillo_6': { id: 'p1_pasillo_6', name: 'Pasillo Biblioteca/Gabinete', floor: '1', x: 790, y: 245 },

  // SEGUNDO PISO
  'p2_aula_203_door': { id: 'p2_aula_203_door', name: 'Puerta Aula A-203', floor: '2', x: 170, y: 180 },
  'p2_aula_205_door': { id: 'p2_aula_205_door', name: 'Puerta Aula A-205', floor: '2', x: 165, y: 300 },
  'p2_escalera_izq_node': { id: 'p2_escalera_izq_node', name: 'Escalera Izquierda (Piso 2)', floor: '2', x: 285, y: 160, isStairs: true, pairId: 'p1_escalera_izq_node', upPairId: 'p3_escalera_izq_node' },
  'p2_aula_201_door': { id: 'p2_aula_201_door', name: 'Puerta Aula A-201', floor: '2', x: 410, y: 210 },
  'p2_aula_204_door': { id: 'p2_aula_204_door', name: 'Puerta Aula A-204', floor: '2', x: 295, y: 300 },
  'p2_aula_202_door': { id: 'p2_aula_202_door', name: 'Puerta Aula A-202', floor: '2', x: 440, y: 300 },
  'p2_baño_mujeres_door': { id: 'p2_baño_mujeres_door', name: 'Puerta Baño Mujeres', floor: '2', x: 522, y: 140 },
  'p2_baño_hombres_door': { id: 'p2_baño_hombres_door', name: 'Puerta Baño Hombres', floor: '2', x: 572, y: 140 },
  'p2_deposito_2_door': { id: 'p2_deposito_2_door', name: 'Puerta Depósito 2', floor: '2', x: 615, y: 140 },
  'p2_deposito_3_door': { id: 'p2_deposito_3_door', name: 'Puerta Depósito 3', floor: '2', x: 655, y: 140 },
  'p2_area_sin_designar_door': { id: 'p2_area_sin_designar_door', name: 'Puerta Área sin Designar', floor: '2', x: 740, y: 200 },
  'p2_terraza_door': { id: 'p2_terraza_door', name: 'Puerta Terraza', floor: '2', x: 870, y: 240 },
  'p2_escalera_der_node': { id: 'p2_escalera_der_node', name: 'Escalera Derecha (Piso 2)', floor: '2', x: 675, y: 300, isStairs: true, pairId: 'p1_escalera_der_node' },
  // Nodos pasillos segundo piso
  'p2_pasillo_1': { id: 'p2_pasillo_1', name: 'Pasillo Izquierda', floor: '2', x: 170, y: 245 },
  'p2_pasillo_2': { id: 'p2_pasillo_2', name: 'Pasillo Centro-Izquierda', floor: '2', x: 285, y: 245 },
  'p2_pasillo_3': { id: 'p2_pasillo_3', name: 'Pasillo Centro', floor: '2', x: 410, y: 245 },
  'p2_pasillo_4': { id: 'p2_pasillo_4', name: 'Pasillo Centro-Derecha', floor: '2', x: 545, y: 245 },
  'p2_pasillo_5': { id: 'p2_pasillo_5', name: 'Pasillo Área Común', floor: '2', x: 670, y: 245 },
  'p2_pasillo_6': { id: 'p2_pasillo_6', name: 'Pasillo Terraza', floor: '2', x: 790, y: 245 },

  // TERCER PISO
  'p3_aula_303_door': { id: 'p3_aula_303_door', name: 'Puerta Aula A-303', floor: '3', x: 170, y: 180 },
  'p3_aula_304_door': { id: 'p3_aula_304_door', name: 'Puerta Aula A-304', floor: '3', x: 165, y: 300 },
  'p3_escalera_izq_node': { id: 'p3_escalera_izq_node', name: 'Escalera Izquierda (Piso 3)', floor: '3', x: 285, y: 160, isStairs: true, pairId: 'p2_escalera_izq_node' },
  'p3_aula_301_door': { id: 'p3_aula_301_door', name: 'Puerta Aula A-301', floor: '3', x: 410, y: 210 },
  'p3_aula_302_door': { id: 'p3_aula_302_door', name: 'Puerta Aula A-302', floor: '3', x: 440, y: 300 },
  'p3_terraza_door': { id: 'p3_terraza_door', name: 'Puerta Terraza', floor: '3', x: 530, y: 180 },
  // Nodos pasillos tercer piso
  'p3_pasillo_1': { id: 'p3_pasillo_1', name: 'Pasillo Izquierda', floor: '3', x: 170, y: 245 },
  'p3_pasillo_2': { id: 'p3_pasillo_2', name: 'Pasillo Centro-Izquierda', floor: '3', x: 285, y: 245 },
  'p3_pasillo_3': { id: 'p3_pasillo_3', name: 'Pasillo Centro', floor: '3', x: 410, y: 245 },
  'p3_pasillo_4': { id: 'p3_pasillo_4', name: 'Pasillo Terraza', floor: '3', x: 490, y: 245 }
};

// Conexiones (Aristas/Enlaces) con su distancia física en píxeles (costo del camino)
export const graphEdges = [
  // --- CONEXIONES PLANTA BAJA ---
  // Pasillo central horizontal
  { from: 'pb_pasillo_1', to: 'pb_pasillo_2', weight: 115 },
  { from: 'pb_pasillo_2', to: 'pb_pasillo_3', weight: 130 },
  { from: 'pb_pasillo_3', to: 'pb_pasillo_4', weight: 130 },
  { from: 'pb_pasillo_4', to: 'pb_pasillo_5', weight: 130 },
  { from: 'pb_pasillo_5', to: 'pb_pasillo_6', weight: 115 },

  // De pasillos a puertas de salas
  { from: 'pb_pasillo_1', to: 'pb_gabinete_sabre_door', weight: 65 },
  { from: 'pb_pasillo_1', to: 'pb_centro_estudiantes_door', weight: 55 },
  
  { from: 'pb_pasillo_2', to: 'pb_escalera_izq_node', weight: 85 },
  { from: 'pb_pasillo_2', to: 'pb_porteria_door', weight: 55 },

  { from: 'pb_pasillo_3', to: 'pb_area_sin_designar_door', weight: 35 },
  { from: 'pb_pasillo_3', to: 'pb_cafeteria_door', weight: 55 },

  { from: 'pb_pasillo_4', to: 'pb_baño_mujeres_door', weight: 105 },
  { from: 'pb_pasillo_4', to: 'pb_baño_hombres_door', weight: 105 },
  { from: 'pb_pasillo_4', to: 'pb_control_biometrico_door', weight: 65 },
  { from: 'pb_pasillo_4', to: 'pb_patio_principal', weight: 110 },

  { from: 'pb_pasillo_5', to: 'pb_sala_docente_door', weight: 45 },
  { from: 'pb_pasillo_5', to: 'pb_escalera_der_node', weight: 55 },

  { from: 'pb_pasillo_6', to: 'pb_vestibulo', weight: 45 },
  { from: 'pb_vestibulo', to: 'pb_fotocopias_door', weight: 75 },
  { from: 'pb_vestibulo', to: 'pb_auditorio_door', weight: 130 },
  { from: 'pb_vestibulo', to: 'pb_cabina_control_door', weight: 170 },
  { from: 'pb_vestibulo', to: 'pb_ingreso_principal', weight: 160 },

  // --- CONEXIONES PRIMER PISO ---
  // Pasillo central horizontal
  { from: 'p1_pasillo_1', to: 'p1_pasillo_2', weight: 115 },
  { from: 'p1_pasillo_2', to: 'p1_pasillo_3', weight: 125 },
  { from: 'p1_pasillo_3', to: 'p1_pasillo_4', weight: 135 },
  { from: 'p1_pasillo_4', to: 'p1_pasillo_5', weight: 125 },
  { from: 'p1_pasillo_5', to: 'p1_pasillo_6', weight: 120 },

  // Puertas a pasillo
  { from: 'p1_pasillo_1', to: 'p1_aula_103_door', weight: 65 },
  { from: 'p1_pasillo_1', to: 'p1_defensa_grado_door', weight: 55 },

  { from: 'p1_pasillo_2', to: 'p1_escalera_izq_node', weight: 85 },
  { from: 'p1_pasillo_2', to: 'p1_aula_104_door', weight: 55 },

  { from: 'p1_pasillo_3', to: 'p1_aula_101_door', weight: 35 },
  { from: 'p1_pasillo_3', to: 'p1_aula_102_door', weight: 55 },

  { from: 'p1_pasillo_4', to: 'p1_baño_mujeres_door', weight: 105 },
  { from: 'p1_pasillo_4', to: 'p1_baño_hombres_door', weight: 105 },
  { from: 'p1_pasillo_4', to: 'p1_deposito_1_door', weight: 105 },

  { from: 'p1_pasillo_5', to: 'p1_direccion_door', weight: 45 },
  { from: 'p1_pasillo_5', to: 'p1_escalera_der_node', weight: 55 },

  { from: 'p1_pasillo_6', to: 'p1_secretaria_door', weight: 90 },
  { from: 'p1_pasillo_6', to: 'p1_kardex_door', weight: 110 },
  { from: 'p1_pasillo_6', to: 'p1_biblioteca_door', weight: 70 },
  { from: 'p1_pasillo_6', to: 'p1_gabinete_informatica_door', weight: 65 },

  // --- CONEXIONES SEGUNDO PISO ---
  // Pasillo central horizontal
  { from: 'p2_pasillo_1', to: 'p2_pasillo_2', weight: 115 },
  { from: 'p2_pasillo_2', to: 'p2_pasillo_3', weight: 125 },
  { from: 'p2_pasillo_3', to: 'p2_pasillo_4', weight: 135 },
  { from: 'p2_pasillo_4', to: 'p2_pasillo_5', weight: 125 },
  { from: 'p2_pasillo_5', to: 'p2_pasillo_6', weight: 120 },

  // Puertas a pasillo
  { from: 'p2_pasillo_1', to: 'p2_aula_203_door', weight: 65 },
  { from: 'p2_pasillo_1', to: 'p2_aula_205_door', weight: 55 },

  { from: 'p2_pasillo_2', to: 'p2_escalera_izq_node', weight: 85 },
  { from: 'p2_pasillo_2', to: 'p2_aula_204_door', weight: 55 },

  { from: 'p2_pasillo_3', to: 'p2_aula_201_door', weight: 35 },
  { from: 'p2_pasillo_3', to: 'p2_aula_202_door', weight: 55 },

  { from: 'p2_pasillo_4', to: 'p2_baño_mujeres_door', weight: 105 },
  { from: 'p2_pasillo_4', to: 'p2_baño_hombres_door', weight: 105 },
  { from: 'p2_pasillo_4', to: 'p2_deposito_2_door', weight: 105 },
  { from: 'p2_pasillo_4', to: 'p2_deposito_3_door', weight: 105 },

  { from: 'p2_pasillo_5', to: 'p2_area_sin_designar_door', weight: 85 },
  { from: 'p2_pasillo_5', to: 'p2_escalera_der_node', weight: 55 },

  { from: 'p2_pasillo_6', to: 'p2_terraza_door', weight: 80 },

  // --- CONEXIONES TERCER PISO ---
  // Pasillo central horizontal (más corto, solo llega hasta la mitad del edificio en este piso)
  { from: 'p3_pasillo_1', to: 'p3_pasillo_2', weight: 115 },
  { from: 'p3_pasillo_2', to: 'p3_pasillo_3', weight: 125 },
  { from: 'p3_pasillo_3', to: 'p3_pasillo_4', weight: 100 },

  // Puertas a pasillo
  { from: 'p3_pasillo_1', to: 'p3_aula_303_door', weight: 65 },
  { from: 'p3_pasillo_1', to: 'p3_aula_304_door', weight: 55 },

  { from: 'p3_pasillo_2', to: 'p3_escalera_izq_node', weight: 85 },
  
  { from: 'p3_pasillo_3', to: 'p3_aula_301_door', weight: 35 },
  { from: 'p3_pasillo_3', to: 'p3_aula_302_door', weight: 55 },

  { from: 'p3_pasillo_4', to: 'p3_terraza_door', weight: 75 },

  // --- CONEXIONES VERTICALES (ESCALERAS ENTRE PISOS) ---
  // Escalera Izquierda (Conecta los 4 niveles PB <-> 1º <-> 2º <-> 3º)
  { from: 'pb_escalera_izq_node', to: 'p1_escalera_izq_node', weight: 150, isVertical: true },
  { from: 'p1_escalera_izq_node', to: 'p2_escalera_izq_node', weight: 150, isVertical: true },
  { from: 'p2_escalera_izq_node', to: 'p3_escalera_izq_node', weight: 150, isVertical: true },

  // Escalera Derecha (Solo conecta PB <-> 1º <-> 2º)
  { from: 'pb_escalera_der_node', to: 'p1_escalera_der_node', weight: 150, isVertical: true },
  { from: 'p1_escalera_der_node', to: 'p2_escalera_der_node', weight: 150, isVertical: true }
];

// Mapeo inverso de ids de habitaciones a IDs de nodos de puerta en el grafo
export const roomToNodeMap = {
  // PB
  'auditorio': 'pb_auditorio_door',
  'cabina_control': 'pb_cabina_control_door',
  'sala_docente': 'pb_sala_docente_door',
  'control_biometrico': 'pb_control_biometrico_door',
  'cafeteria': 'pb_cafeteria_door',
  'porteria': 'pb_porteria_door',
  'gabinete_sabre': 'pb_gabinete_sabre_door',
  'centro_estudiantes': 'pb_centro_estudiantes_door',
  'fotocopias': 'pb_fotocopias_door',
  'baño_mujeres_pb': 'pb_baño_mujeres_door',
  'baño_hombres_pb': 'pb_baño_hombres_door',
  'area_sin_designar_pb': 'pb_area_sin_designar_door',
  'ingreso_principal': 'pb_ingreso_principal',
  'vestibulo': 'pb_vestibulo',
  'escalera_izq_pb': 'pb_escalera_izq_node',
  'escalera_der_pb': 'pb_escalera_der_node',
  'patio_principal': 'pb_patio_principal',

  // Primer Piso
  'aula_103': 'p1_aula_103_door',
  'defensa_grado': 'p1_defensa_grado_door',
  'aula_101': 'p1_aula_101_door',
  'aula_104': 'p1_aula_104_door',
  'aula_102': 'p1_aula_102_door',
  'direccion': 'p1_direccion_door',
  'secretaria': 'p1_secretaria_door',
  'kardex': 'p1_kardex_door',
  'biblioteca': 'p1_biblioteca_door',
  'gabinete_informatica': 'p1_gabinete_informatica_door',
  'baño_mujeres_p1': 'p1_baño_mujeres_door',
  'baño_hombres_p1': 'p1_baño_hombres_door',
  'deposito_1': 'p1_deposito_1_door',
  'escalera_izq_p1': 'p1_escalera_izq_node',
  'escalera_der_p1': 'p1_escalera_der_node',

  // Segundo Piso
  'aula_203': 'p2_aula_203_door',
  'aula_205': 'p2_aula_205_door',
  'aula_201': 'p2_aula_201_door',
  'aula_204': 'p2_aula_204_door',
  'aula_202': 'p2_aula_202_door',
  'baño_mujeres_p2': 'p2_baño_mujeres_door',
  'baño_hombres_p2': 'p2_baño_hombres_door',
  'deposito_2': 'p2_deposito_2_door',
  'deposito_3': 'p2_deposito_3_door',
  'area_sin_designar_p2': 'p2_area_sin_designar_door',
  'terraza_p2': 'p2_terraza_door',
  'escalera_izq_p2': 'p2_escalera_izq_node',
  'escalera_der_p2': 'p2_escalera_der_node',

  // Tercer Piso
  'aula_303': 'p3_aula_303_door',
  'aula_304': 'p3_aula_304_door',
  'aula_301': 'p3_aula_301_door',
  'aula_302': 'p3_aula_302_door',
  'terraza_p3': 'p3_terraza_door',
  'escalera_izq_p3': 'p3_escalera_izq_node'
};
