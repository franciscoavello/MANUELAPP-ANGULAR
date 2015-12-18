class TipoEncuesta < ActiveRecord::Base
  self.table_name = "tipos_encuesta"

  has_many :encuestums
end
