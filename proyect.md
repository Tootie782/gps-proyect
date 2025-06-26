Proyecto Final Gestión de Proyectos de Software - EduConecta
Integrantes: Maximiliano Cortés, Germán Jara, Carlo Negroni

1. Gestión de Recursos	3
2. Planificación (Cronograma)	4
3. Estimaciones	5
4. AutoOrganización Estudiantes	5
5. Gestión de Riesgos	5
1. Conectividad deficiente:	5
2. Resistencia al cambio por parte de los usuarios:	5
3. Errores críticos:	6
6. Proactividad	6
7. Uso de Herramientas	6
1. Gestión de versiones y colaboración	6
2. Gestión del proyecto	6
3. Diseño de interfaz	6
4. Simulación y pruebas	6
5. Simulación de datos offline	6
8. Requerimientos Funcionales	7
Registro de escuelas	7
Registro de docentes	7
Registro y gestión de estudiantes	7
Registro y gestión de cursos	7
Gestión del perfil de usuario	7
Registro de actividades escolares	7
Registro de asistencia	7
Visualización y monitoreo del progreso	7
Generación de reportes	7
Exportación de reportes	7
Visualización para estudiantes/familias	7
Recomendaciones académicas	7
Sincronización en tiempo real	7
Autenticación y recuperación de acceso	7
Gestión de roles y permisos	8
Seguridad y privacidad de los datos	8
9. Requerimientos No Funcionales	8
Disponibilidad offline	8
Interfaz intuitiva y accesible	8
Compatibilidad multiplataforma	8
Seguridad de datos personales	8
Sincronización eficiente	8
10. Casos de Uso	8
Registrar escuela	8
Registrar docente	8
Registrar estudiante	9
Registrar curso	9
Asignar docente/estudiante a curso	9
Gestionar perfil de usuario	9
Editar ficha estudiante	9
Registrar actividad	9
Registrar asistencia	9
Ver progreso estudiante	9
Generar reporte curso	9
Exportar reporte	9
Visualizar información del estudiante	9
Generar recomendaciones a estudiantes	9
Sincronizar datos	9
Iniciar sesión	9
Recuperar contraseña	9
Asignar roles y permisos	10
Registrar materias a un curso	10
1. Gestión de Recursos
Los roles que tomarán los actores identificados Administrador, Docente y Estudiante serán los siguientes
Administrador Regional:
 Responsable de la gestión global del sistema. Puede registrar escuelas, docentes y generar reportes institucionales. Además, tiene acceso a la administración de perfiles y puede supervisar el progreso académico a nivel macro.
Administrador Escuela:
 Responsable de la gestión de su escuela. Puede asignar docentes y cursos, asignar usuarios a roles, definir permisos y generar reportes de su institución.


Docente:
 Encargado de la operación pedagógica en el sistema. Puede registrar estudiantes, crear y gestionar actividades escolares, registrar asistencia diaria, editar fichas académicas de los estudiantes, visualizar el progreso de sus cursos, generar reportes por curso y exportarlos. Participa también en la asignación de estudiantes a cursos.


Estudiante:
 Usuario con perfil informativo. Tiene acceso a visualizar su información académica, incluyendo asistencia, calificaciones, actividades y recomendaciones personalizadas generadas por el sistema. No tiene funciones de edición.


Además, para la implementación del sistema se considera la participación de un equipo técnico conformado por roles como:
Desarrolladores: Responsables del desarrollo backend y frontend del sistema.


Diseñador UI/UX: Encargado de la interfaz accesible para usuarios con formación básica en TIC.


Coordinador de zona o soporte en terreno: Persona de enlace que capacita y apoya a docentes en zonas rurales con baja conectividad

2. Planificación (Cronograma)

Actividad
Fecha estimada
Descripción
Inicio del desarrollo
17 de junio de 2025
Inicio de la planificación técnica y configuración base del entorno.
Diseño de interfaces (UI/UX)
17 de junio – 30 de junio de 2025
Prototipado de pantallas clave, diseño responsivo y pruebas de usabilidad.
Desarrollo del backend (APIs, seguridad, roles)
1 – 21 de julio de 2025
Desarrollo de lógica del sistema, autenticación, y modelos de datos.
Desarrollo del frontend (vistas principales)
22 de julio – 11 de agosto de 2025
Construcción de vistas: dashboard, fichas, formularios, navegación.
Implementación de sincronización y soporte offline
12 – 25 de agosto de 2025
Integración de almacenamiento local y sincronización eficiente.
Pruebas internas (QA y test de usuario técnico)
26 de agosto – 5 de septiembre de 2025
Pruebas funcionales, validación de requisitos y solución de errores.
Instalación en escuelas piloto
8 – 12 de septiembre de 2025
Despliegue inicial en escuelas con baja conectividad.
Prueba en terreno con docentes
15 – 26 de septiembre de 2025
Evaluación de usabilidad y funcionamiento real con usuarios finales.
Capacitaciones
29 de septiembre – 3 de octubre de 2025
Talleres presenciales o remotos con docentes y coordinadores.
Ajustes finales y mejoras
6 – 17 de octubre de 2025
Implementación de mejoras según retroalimentación real.
Despliegue general del sistema
20 de octubre de 2025
Lanzamiento oficial para el resto de escuelas del proyecto.

3. Estimaciones 
Las estimación del proyecto se encuentra en el siguiente enlace, igualmente se encuentra adjuntado a la entrega de éste informe.

Estimación Proyecto Final GPS
4. AutoOrganización Estudiantes

5. Gestión de Riesgos
A continuación, se identifican los principales riesgos asociados al proyecto, junto con sus respectivas estrategias de mitigación. Si bien estas soluciones ya han sido consideradas en el desarrollo del sistema, se detallan aquí para una visualización más clara de los principales riesgos del proyecto.
1. Conectividad deficiente: 
Problema: Dado que el sistema se implementará en zonas rurales con acceso limitado a internet, podría haber problemas al registrar o consultar datos
Mitigación: Se implementará soporte offline, permitiendo trabajar sin conexión y sincronizar automáticamente cuando se recupere la conectividad (RNF01).
2. Resistencia al cambio por parte de los usuarios: 
Problema: Algunos docentes podrían mostrar dificultad o rechazo ante el uso de nuevas herramientas digitales.
Mitigación: Se realizarán capacitaciones prácticas y se diseñó una interfaz intuitiva y accesible para usuarios con baja formación en TIC (RNF02).
3. Errores críticos:
Problema: Existe el riesgo de fallas funcionales que afecten el uso durante etapas clave.
Mitigación: Se contempla una fase de pruebas internas y en terreno, uso de control de versiones y mecanismos de rollback para garantizar estabilidad.
6. Proactividad
Dentro de las recomendaciones extras a implementar existen las siguientes:

Generar recomendaciones en base a estadísticas para todos los usuarios.
Previsualizar el próximo año académico del curso.
Asignación de roles y permisos automática al momento de crear usuarios.
Superposición de conflictos horarios curso y profesor al registrar una materia.
7. Uso de Herramientas
Durante el desarrollo del proyecto se emplearán herramientas específicas para facilitar la colaboración, el diseño, el control de versiones y la simulación de funcionalidades clave:
1. Gestión de versiones y colaboración
Git + GitHub/GitLab: Para control de versiones, trabajo colaborativo entre el equipo y seguimiento de cambios en el código fuente.
2. Gestión del proyecto
Jira: Para organizar tareas, asignar responsables, gestionar avances y mantener una visión clara del progreso.
3. Diseño de interfaz
Figma: Para la creación de interfaces de la aplicación
4. Simulación y pruebas
Postman/ Insomnia / Swagger: Para probar y documentar las API del sistema, facilitando la validación de funcionalidades durante el desarrollo.
5. Simulación de datos offline
SqLite / LocalStorage (navegador) o PouchDB: Para simular almacenamiento local en modo offline, permitiendo sincronización posterior con el servidor 



8. Requerimientos Funcionales

ID
Nombre
Descripción
RF01
Registro de escuelas
El sistema debe permitir registrar nuevas escuelas.
RF02
Registro de docentes
El sistema debe permitir registrar docentes y asociarlos a escuelas.
RF03
Registro y gestión de estudiantes
El sistema debe permitir crear, editar y visualizar fichas de estudiantes con datos personales, historial académico, asistencia y progreso.
RF04
Registro y gestión de cursos
El sistema debe permitir registrar cursos y asignar estudiantes y docentes a ellos.
RF05
Gestión del perfil de usuario
El sistema debe permitir que cada usuario edite su perfil.
RF06
Registro de actividades escolares
Los docentes deben poder registrar actividades escolares (pruebas, trabajos, etc.).
RF07
Registro de asistencia
Los docentes deben poder registrar la asistencia diaria de estudiantes.
RF08
Visualización y monitoreo del progreso
El sistema debe mostrar el progreso académico de los estudiantes por curso.
RF09
Generación de reportes
El sistema debe generar reportes por estudiante, curso o escuela.
RF10
Exportación de reportes
Los reportes deben poder exportarse en PDF o formatos similares.
RF11
Visualización para estudiantes/familias
Los estudiantes deben poder ver la información académica del estudiante.
RF12
Recomendaciones académicas
El sistema debe generar sugerencias personalizadas según el desempeño del estudiante.
RF13
Sincronización en tiempo real
El sistema debe sincronizar automáticamente los datos entre clientes y servidor.
RF14
Autenticación y recuperación de acceso
El sistema debe permitir iniciar sesión, cerrar sesión y recuperar contraseña.
RF15
Gestión de roles y permisos
El sistema debe permitir asignar roles (Admin, Docente, Estudiante) con sus respectivos permisos.
RF016
Seguridad y privacidad de los datos
El sistema debe garantizar protección de datos personales y acceso según roles.



9. Requerimientos No Funcionales

ID
Requerimiento No Funcional
Descripción
RNF01
Disponibilidad offline
El sistema debe ser capaz de funcionar sin conexión a internet, almacenando datos localmente y sincronizándolos automáticamente al recuperar la conectividad.
RNF02
Interfaz intuitiva y accesible
La interfaz debe ser fácil de usar para docentes con formación básica en TIC, con íconos claros, textos comprensibles y navegación guiada.
RNF03
Compatibilidad multiplataforma
El sistema debe ser accesible desde dispositivos móviles (Android) y computadores de escritorio, usando tecnologías web responsivas.
RNF04
Seguridad de datos personales
La información sensible (fichas, calificaciones, usuarios) debe estar protegida mediante autenticación, cifrado y control de acceso por rol.
RNF05
Sincronización eficiente
El proceso de sincronización debe ser rápido, con verificación de conflictos y mínimo uso de ancho de banda.



10. Casos de Uso

ID
Nombre Caso de Uso
Actor Principal
Descripción
CU-01
Registrar escuela
Administrador Regional
Permite registrar una nueva escuela con sus datos.
CU-02
Registrar docente
Administrador Escuela
Permite registrar docentes y asignarlos a escuelas.
CU-03
Registrar estudiante
Docente / Administrador Escuela
Permite registrar un estudiante y vincularlo a un curso.
CU-04
Registrar curso
Administrador Escuela
Permite registrar cursos y su información básica.
CU-05
Asignar docente/estudiante a curso
Administrador Escuela / Docente
Permite asignar docentes o estudiantes a un curso determinado.
CU-06
Gestionar perfil de usuario
Todos
Permite editar la información del perfil del usuario.
CU-07
Editar ficha estudiante
Docente
Permite editar datos académicos o personales del estudiante.
CU-08
Registrar actividad
Docente
Permite agregar actividades escolares a un curso.
CU-09
Registrar asistencia
Docente
Permite marcar asistencia de los estudiantes.
CU-10
Ver progreso estudiante
Docente
Muestra el resumen de avance académico y participación.
CU-11
Generar reporte curso
Docente / Administrador
Genera reportes académicos por curso.
CU-12
Exportar reporte
Docente / Administradores
Permite exportar el reporte generado en formato descargable.
CU-13
Visualizar información del estudiante
Estudiante
Muestra información escolar del estudiante.
CU-14
Generar recomendaciones a estudiantes
Sistema
Ofrece recomendaciones académicas personalizadas.
CU-15
Sincronizar datos
Sistema
Sincroniza automáticamente los datos cuando hay conectividad.
CU-16
Iniciar sesión
Todos
Permite autenticarse en el sistema.
CU-17
Recuperar contraseña
Todos
Permite recuperar el acceso en caso de contraseña olvidada.
CU-18
Asignar roles y permisos
Sistema
Permite definir qué puede hacer cada tipo de usuario.
CU-19 
Registrar materias a un curso
Administrador Escuela
Permite agregar una materia a un curso


