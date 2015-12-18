class CreateEncuesta < ActiveRecord::Migration
  def change
    create_table :encuesta do |t|
      t.boolean :estado
      t.string :nombre
      t.text :descripcion
      t.integer :tipo_encuesta_id

      t.timestamps null: false
    end
  end
end
