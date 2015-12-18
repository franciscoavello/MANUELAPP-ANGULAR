class CreateTipoEncuesta < ActiveRecord::Migration
  def change
    create_table :tipos_encuesta do |t|
      t.string  :nombre

      t.timestamps null: false
    end
  end
end
