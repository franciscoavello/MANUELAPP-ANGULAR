json.array!(@curso_alumnos) do |curso_alumno|
  json.extract! curso_alumno, :id, :curso_id, :alumno_id, :grupo_id
  json.url curso_alumno_url(curso_alumno, format: :json)
end
