class CreateCursos < ActiveRecord::Migration
  def change
    create_table :cursos do |t|
      t.integer :profesor_id
      t.string  :nombre
      t.integer :semestre
      t.integer :año

      t.timestamps null: false
    end
  end
end
