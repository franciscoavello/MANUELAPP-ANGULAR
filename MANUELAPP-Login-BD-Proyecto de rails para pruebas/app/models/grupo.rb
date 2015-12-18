class Grupo < ActiveRecord::Base
  has_many :curso_alumnos, class_name: 'CursoAlumno'
  has_many :integrantes,
    through: :curso_alumnos,
    source: :alumno
  belongs_to :jefe_grupo, class_name: 'Alumno', foreign_key: 'alumno_id'
  belongs_to :curso
end
