json.array!(@encuesta) do |encuesta|
  json.extract! encuesta, :id, :Encuesta_id, :Encuesta_estado, :Encuesta_nombre, :Encuesta_descripcion
  json.url encuesta_url(encuesta, format: :json)
end
