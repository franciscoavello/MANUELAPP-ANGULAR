class CursoAlumno < ActiveRecord::Base
  belongs_to :grupo
  belongs_to :curso
  belongs_to :alumno, class_name: 'Alumno'
end
