json.array!(@alumnos) do |alumno|
  json.extract! alumno, :id, :nombre, :apellido_paterno, :apellido_materno, :usuario_id
  json.url alumno_url(alumno, format: :json)
end
