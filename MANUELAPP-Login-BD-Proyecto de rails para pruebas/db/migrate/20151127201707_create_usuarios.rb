class CreateUsuarios < ActiveRecord::Migration
  def change
    create_table :usuarios do |t|
      t.string  :rut
      t.string  :nombre
      t.string  :correo
      t.integer :rol  # ???

      t.timestamps null: false
    end
  end
end
