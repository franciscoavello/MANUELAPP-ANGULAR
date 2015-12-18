class CreatePregunta < ActiveRecord::Migration
  def change
    create_table :preguntas do |t|
      t.string  :enunciado

      t.timestamps null: false
    end
  end
end
