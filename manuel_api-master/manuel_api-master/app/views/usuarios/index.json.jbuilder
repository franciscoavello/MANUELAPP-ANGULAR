json.array!(@usuarios) do |usuario|
  json.extract! usuario, :id, :rut, :nombre, :correo, :rol
  json.url usuario_url(usuario, format: :json)
end
