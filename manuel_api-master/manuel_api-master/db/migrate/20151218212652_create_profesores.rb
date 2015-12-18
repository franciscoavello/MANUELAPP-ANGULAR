class CreateProfesores < ActiveRecord::Migration
  def change
    create_table :profesores do |t|
      t.string :nombre
      t.string :apellido_paterno
      t.string :apellido_materno
      t.text :descripcion
      t.integer :usuario_id

      t.timestamps null: false
    end
  end
end
