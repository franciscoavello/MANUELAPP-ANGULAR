json.array!(@grupos) do |grupo|
  json.extract! grupo, :id, :Grupo_id, :Grupo_lider
  json.url grupo_url(grupo, format: :json)
end
