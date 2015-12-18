class Usuario < ActiveRecord::Base
	has_many :cursos
	has_many :respuestums
	has_many :respuestums
	has_many :grupos
	has_many :curso_alumnos
end
