class Profesor < ActiveRecord::Base
  self.table_name = "profesores"

  has_many :cursos
end
