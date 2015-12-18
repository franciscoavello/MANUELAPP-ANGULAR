json.array!(@opcions) do |opcion|
  json.extract! opcion, :id, :Opcion_id, :Opcion_valor
  json.url opcion_url(opcion, format: :json)
end
