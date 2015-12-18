# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151202074424) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alumnos", force: :cascade do |t|
    t.string   "nombre"
    t.string   "apellido_paterno"
    t.string   "apellido_materno"
    t.integer  "usuario_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "curso_alumnos", force: :cascade do |t|
    t.integer  "Curso_Alumno_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "cursos", force: :cascade do |t|
    t.integer  "Curso_id"
    t.string   "Curso_nombre"
    t.integer  "Curso_semestre"
    t.integer  "Curso_año"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "encuestas", force: :cascade do |t|
    t.integer  "Encuesta_id"
    t.boolean  "Encuesta_estado"
    t.string   "Encuesta_nombre"
    t.text     "Encuesta_descripcion"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "encuesta_pregunta", force: :cascade do |t|
    t.integer  "Encuesta_Pregunta_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "evaluacions", force: :cascade do |t|
    t.integer  "Evaluacion_id"
    t.integer  "Evaluacion_contestada"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "grupos", force: :cascade do |t|
    t.integer  "Grupo_id"
    t.string   "Grupo_lider"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "opcions", force: :cascade do |t|
    t.integer  "Opcion_id"
    t.integer  "Opcion_valor"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "pregunta", force: :cascade do |t|
    t.integer  "Pregunta_id"
    t.text     "Pregunta_enunciado"
    t.text     "Pregunta_Descripcion"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "profesores", force: :cascade do |t|
    t.string   "nombre"
    t.string   "apellido"
    t.text     "descripcion"
    t.integer  "usuario_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "respuesta", force: :cascade do |t|
    t.integer  "Respuesta_id"
    t.integer  "Respuesta_modulo"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "tipo_encuesta", force: :cascade do |t|
    t.integer  "Tipo_id"
    t.string   "Tipo_nombre"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "usuarios", force: :cascade do |t|
    t.integer  "rut"
    t.string   "nombre"
    t.string   "correo"
    t.integer  "rol"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

end
