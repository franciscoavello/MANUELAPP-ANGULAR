class CreateRespuesta < ActiveRecord::Migration
  def change
    create_table :respuestas do |t|
      t.integer :modulo
      t.integer :encuestado_id
      t.integer :encuestador_id
      t.integer :evaluacion_id

      t.timestamps null: false
    end
  end
end
