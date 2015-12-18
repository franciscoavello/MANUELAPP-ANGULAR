json.array!(@pregunta) do |preguntum|
  json.extract! preguntum, :id, :enunciado
  json.url preguntum_url(preguntum, format: :json)
end
