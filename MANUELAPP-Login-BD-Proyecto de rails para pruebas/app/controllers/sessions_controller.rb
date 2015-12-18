class SessionsController < ApplicationController

	def create
		auth = request.env["omniauth.auth"]
		session[:omniauth] = auth.except('extra')
		user = User.sign_in_from_omniauth(auth)
		session[:user_id] = user.id
		usuarioSemilogeado = Usuario.find_by(Usuario_correo: auth[:info][:email])
		if(usuarioSemilogeado and usuarioSemilogeado.Usuario_rol==0)
			redirect_to root_url(rol: 0), notice: "Sesión iniciada como Administrador"
		elsif(usuarioSemilogeado and usuarioSemilogeado.Usuario_rol==1)
			redirect_to root_url(rol: 1), notice: "Sesión iniciada como Profesor"
		elsif(usuarioSemilogeado and usuarioSemilogeado.Usuario_rol==2)
			redirect_to root_url(rol: 2), notice: "Sesión iniciada como Alumno"
		else
			session[:user_id] = nil
			session[:omniauth] = nil
			redirect_to root_url, notice: "No tiene autorización para ingresar a la aplicación"
		end
	end

	def destroy
		session[:user_id] = nil
		session[:omniauth] = nil
		redirect_to root_url, notice: "Sesión cerrada correctamente"
	end
end
