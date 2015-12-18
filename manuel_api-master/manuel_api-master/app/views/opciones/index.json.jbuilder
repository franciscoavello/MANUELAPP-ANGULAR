json.array!(@opciones) do |opcione|
  json.extract! opcione, :id, :valor, :opcion_text, :pregunta_id
  json.url opcione_url(opcione, format: :json)
end
