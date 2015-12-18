json.array!(@cursos) do |curso|
  json.extract! curso, :id, :Curso_id, :Curso_nombre, :Curso_semestre, :Curso_año
  json.url curso_url(curso, format: :json)
end
