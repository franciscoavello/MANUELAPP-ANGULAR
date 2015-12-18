class Curso < ActiveRecord::Base
  has_many :grupos
  has_many :curso_alumno, class_name: 'CursoAlumno'
  has_many :alumnos,
    through: :curso_alumno,
    source: :alumno
  belongs_to :profesor 
end
