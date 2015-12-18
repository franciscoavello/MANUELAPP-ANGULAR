json.array!(@pregunta) do |preguntum|
  json.extract! preguntum, :id, :Pregunta_id, :Pregunta_enunciado, :Pregunta_Descripcion
  json.url preguntum_url(preguntum, format: :json)
end
