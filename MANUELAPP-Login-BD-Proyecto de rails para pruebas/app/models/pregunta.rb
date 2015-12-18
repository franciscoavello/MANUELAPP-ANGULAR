class Pregunta < ActiveRecord::Base
  self.table_name = "preguntas"

  has_many :opcions
  has_many :encuesta_preguntums
end
