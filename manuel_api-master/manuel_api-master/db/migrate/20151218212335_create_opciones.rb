class CreateOpciones < ActiveRecord::Migration
  def change
    create_table :opciones do |t|
      t.integer :valor
      t.string :opcion_text
      t.integer :pregunta_id

      t.timestamps null: false
    end
  end
end
