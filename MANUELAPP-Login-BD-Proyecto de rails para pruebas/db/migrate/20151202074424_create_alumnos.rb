class CreateAlumnos < ActiveRecord::Migration
  def change
    create_table :alumnos do |t|
      t.string  :nombre
      t.string  :apellido_paterno
      t.string  :apellido_materno
      t.integer :usuario_id

      t.timestamps null: false
    end
  end
end
