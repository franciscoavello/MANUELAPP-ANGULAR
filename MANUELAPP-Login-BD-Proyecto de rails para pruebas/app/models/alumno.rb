class Alumno < ActiveRecord::Base

  has_many :_cu_al, class_name: 'CursoAlumno'
  has_many :cursos,
    through: :_cu_al,
    source: :curso
end
