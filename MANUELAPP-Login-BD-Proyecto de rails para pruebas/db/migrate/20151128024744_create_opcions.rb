class CreateOpcions < ActiveRecord::Migration
  def change
    create_table :opciones do |t|
      t.integer :valor
      t.string  :opcion_text  # el texto de la opcion u alternativa
      t.integer :pregunta_id

      t.timestamps null: false
    end
  end
end
