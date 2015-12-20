json.array!(@profesores) do |profesore|
  json.extract! profesore, :id, :nombre, :apellido_paterno, :apellido_materno, :descripcion, :usuario_id
  json.url profesore_url(profesore, format: :json)
end
