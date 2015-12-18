json.array!(@respuesta) do |respuestum|
  json.extract! respuestum, :id, :Respuesta_id, :Respuesta_modulo
  json.url respuestum_url(respuestum, format: :json)
end
