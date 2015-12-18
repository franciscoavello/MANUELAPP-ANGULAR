class Encuesta < ActiveRecord::Base
  self.table_name = "encuestas"

  has_many :encuesta_preguntums
  has_many :evaluacions
  belongs_to :tipo_encuestum
end
