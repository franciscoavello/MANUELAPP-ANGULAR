# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Usuario.create(rut: 181895683, nombre: 'Francisco', apellido_paterno: 'Avello', apellido_materno: 'Barrera', correo: 'francisco.avello@usach.cl', rol: 2 )
Usuario.create(rut: 222333445, nombre: 'Juan', apellido_paterno: 'Perez', apellido_materno: 'Cabral', correo: 'sdsd.sd@usach.cl', rol: 2 )
Usuario.create(rut: 551122887, nombre: 'Ricardo', apellido_paterno: 'Paredes', apellido_materno: 'Rodriguez', correo: 'asdaxcx.xzv@usach.cl', rol: 2 )
Usuario.create(rut: 524777888, nombre: 'Sandra', apellido_paterno: 'Bascur', apellido_materno: 'Tirado', correo: 'ew.zxv@usach.cl', rol: 2 )
Usuario.create(rut: 458786422, nombre: 'Carolina', apellido_paterno: 'Diaz', apellido_materno: 'Aguilera', correo: 'fsdfsfd.vzvwd@usach.cl', rol: 1 )
Usuario.create(rut: 25545877, nombre: 'Esteban', apellido_paterno: 'Bello', apellido_materno: 'Montenegro', correo: 'ewre.ghgf@usach.cl', rol: 1 )

Alumno.create(rut: 181895683, nombre: 'Francisco', apellido_paterno: 'Avello', apellido_materno: 'Barrera', correo: 'francisco.avello@usach.cl', usuario_id: 1)
Alumno.create(rut: 222333445, nombre: 'Juan', apellido_paterno: 'Perez', apellido_materno: 'Cabral', correo: 'sdsd.sd@usach.cl', usuario_id: 2 )
Alumno.create(rut: 551122887, nombre: 'Ricardo', apellido_paterno: 'Paredes', apellido_materno: 'Rodriguez', correo: 'asdaxcx.xzv@usach.cl', usuario_id: 3 )
Alumno.create(rut: 524777888, nombre: 'Sandra', apellido_paterno: 'Bascur', apellido_materno: 'Tirado', correo: 'ew.zxv@usach.cl', usuario_id: 4 )

Profesore.create(rut: 458786422, nombre: 'Carolina', apellido_paterno: 'Diaz', apellido_materno: 'Aguilera', correo: 'fsdfsfd.vzvwd@usach.cl', descripcion: 'eso', usuario_id: 5 )
Profesore.create(rut: 25545877, nombre: 'Esteban', apellido_paterno: 'Bello', apellido_materno: 'Montenegro', correo: 'ewre.ghgf@usach.cl', descripcion: 'eso22', usuario_id: 6 )

Curso.create(profesor_id: 1, nombre: 'IHC', semestre: 2, año:2015, descripcion: 'Curso IHC Edmundo Leiva')
Curso.create(profesor_id: 2, nombre: 'Pingeso', semestre: 2, año:2015, descripcion: 'Curso PINGESO 2/2015' )
Curso.create(profesor_id: 1, nombre: 'CYS', semestre: 2, año:2015, descripcion: 'Curso CyS' )

CursoAlumno.create(curso_id:1, alumno_id:1)
CursoAlumno.create(curso_id:1, alumno_id:2)
CursoAlumno.create(curso_id:1, alumno_id:3)
CursoAlumno.create(curso_id:2, alumno_id:2)
CursoAlumno.create(curso_id:2, alumno_id:1)
CursoAlumno.create(curso_id:2, alumno_id:4)
CursoAlumno.create(curso_id:2, alumno_id:3)
CursoAlumno.create(curso_id:3, alumno_id:1)
CursoAlumno.create(curso_id:3, alumno_id:4)

Grupo.create(nombre: 'Grupo 1', curso_id: 1, descripcion: 'Eso po')
Grupo.create(nombre: 'Grupo 2', curso_id: 1, descripcion: 'dsfd po')
Grupo.create(nombre: 'Grupo 3', curso_id: 1, descripcion: 'Efsso sdf')
Grupo.create(nombre: 'Grupo 1', curso_id: 2, descripcion: 'sdfsfd')
Grupo.create(nombre: 'Grupo 1', curso_id: 3, descripcion: 'dsfsg')
Grupo.create(nombre: 'Grupo 2', curso_id: 3, descripcion: 'gsdgsg')

GrupoAlumno.create(alumno_id: 1 , grupo_id:1)
GrupoAlumno.create(alumno_id: 2 , grupo_id:1)
GrupoAlumno.create(alumno_id: 3 , grupo_id:2)
GrupoAlumno.create(alumno_id: 4 , grupo_id:3)
GrupoAlumno.create(alumno_id: 1 , grupo_id:4)
GrupoAlumno.create(alumno_id: 2 , grupo_id:4)
GrupoAlumno.create(alumno_id: 3 , grupo_id:4)
GrupoAlumno.create(alumno_id: 4 , grupo_id:4)
GrupoAlumno.create(alumno_id: 1 , grupo_id:5)
GrupoAlumno.create(alumno_id: 3 , grupo_id:5)
GrupoAlumno.create(alumno_id: 2 , grupo_id:6)

TiposEncuestum.create(nombre: 'Encuesta 360')
TiposEncuestum.create(nombre: 'Encuesta Liderazgo')

Encuestum.create(estado: true, nombre: 'Encuesta IHC 360 semestre 2', descripcion: 'Contesten la encuesta', tipo_encuesta_id: 1)
Encuestum.create(estado: true, nombre: 'Encuesta IHC Liderazgo semestre 2', descripcion: 'sada la encuesta', tipo_encuesta_id: 2)
Encuestum.create(estado: true, nombre: 'Encuesta 360 Pingeso', descripcion: 'Hola la encuesta', tipo_encuesta_id: 1)
Encuestum.create(estado: true, nombre: 'Encuesta Liderazgo CYS', descripcion: 'sdsdqw la d', tipo_encuesta_id: 2)

Preguntum.create(enunciado: '¿Como se llama?')
Preguntum.create(enunciado: '¿Como me llamo?')
Preguntum.create(enunciado: '¿Como se llaman?')

EncuestaPreguntum.create(encuesta_id: 1, pregunta_id: 1)
EncuestaPreguntum.create(encuesta_id: 1, pregunta_id: 2)
EncuestaPreguntum.create(encuesta_id: 1, pregunta_id: 3)
EncuestaPreguntum.create(encuesta_id: 2, pregunta_id: 1)
EncuestaPreguntum.create(encuesta_id: 2, pregunta_id: 3)
EncuestaPreguntum.create(encuesta_id: 3, pregunta_id: 2)
EncuestaPreguntum.create(encuesta_id: 3, pregunta_id: 3)
EncuestaPreguntum.create(encuesta_id: 4, pregunta_id: 2)
EncuestaPreguntum.create(encuesta_id: 4, pregunta_id: 3)
EncuestaPreguntum.create(encuesta_id: 4, pregunta_id: 4)

Evaluacione.create(contestada: 0, curso_id:1, encuesta_id:1)
Evaluacione.create(contestada: 0, curso_id:1, encuesta_id:2)
Evaluacione.create(contestada: 0, curso_id:2, encuesta_id:3)
Evaluacione.create(contestada: 0, curso_id:3, encuesta_id:4)

Opcione.create( valor: 0 , opcion_text: 'sdfs',pregunta_id: 1 )
Opcione.create( valor: 1 , opcion_text: 'dfsfsa',pregunta_id: 1 )
Opcione.create( valor: 2 , opcion_text: '34rr',pregunta_id: 1 )
Opcione.create( valor: 3 , opcion_text: 'nvcc',pregunta_id: 1 )

Opcione.create( valor: 0 , opcion_text: 'Eso',pregunta_id: 2 )
Opcione.create( valor: 1 , opcion_text: 'Copenhagen',pregunta_id: 2 )
Opcione.create( valor: 2 , opcion_text: 'Copsdsdagen',pregunta_id: 2 )
Opcione.create( valor: 3 , opcion_text: 'SWdqwgen',pregunta_id: 2 )

Opcione.create( valor: 0 , opcion_text: 'dfdsfs',pregunta_id: 3 )
Opcione.create( valor: 1 , opcion_text: 'nbvr',pregunta_id: 3 )
Opcione.create( valor: 2 , opcion_text: 'ytgh',pregunta_id: 3 )
Opcione.create( valor: 3 , opcion_text: 'sadwqqn',pregunta_id: 3 )

EncuestaAlumno.create(estado: true, alumno_id: 1, encuesta_id:1)
EncuestaAlumno.create(estado: true, alumno_id: 2, encuesta_id:3)
EncuestaAlumno.create(estado: false, alumno_id: 3, encuesta_id:2)
EncuestaAlumno.create(estado: false, alumno_id: 4, encuesta_id:1)
EncuestaAlumno.create(estado: true, alumno_id: 1, encuesta_id:2)
EncuestaAlumno.create(estado: false, alumno_id: 1, encuesta_id:3)
EncuestaAlumno.create(estado: false, alumno_id: 1, encuesta_id:4)
EncuestaAlumno.create(estado: false, alumno_id: 3, encuesta_id:1)
