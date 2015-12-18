json.array!(@encuesta) do |encuestum|
  json.extract! encuestum, :id, :estado, :nombre, :descripcion, :tipo_encuesta_id
  json.url encuestum_url(encuestum, format: :json)
end
