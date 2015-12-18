json.array!(@evaluacions) do |evaluacion|
  json.extract! evaluacion, :id, :Evaluacion_id, :Evaluacion_contestada
  json.url evaluacion_url(evaluacion, format: :json)
end
