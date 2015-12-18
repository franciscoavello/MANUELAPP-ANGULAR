class Evaluacion < ActiveRecord::Base
	has_many :respuestums
	belongs_to :grupo
	belongs_to :encuestum
end
