json.array!(@grupos) do |grupo|
  json.extract! grupo, :id, :nombre, :alumno_id, :curso_id, :descripcion
  json.url grupo_url(grupo, format: :json)
end
