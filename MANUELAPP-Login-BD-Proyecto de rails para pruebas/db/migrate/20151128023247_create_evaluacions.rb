class CreateEvaluacions < ActiveRecord::Migration
  def change
    create_table :evaluaciones do |t|
      t.integer :contestada   # ???
      t.integer :curso_id
      t.integer :encuesta_id    # ???

      t.timestamps null: false
    end
  end
end
