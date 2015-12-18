class StaticPagesController < ApplicationController
  before_action :set_auth

  def home
  end

  def alumno 
  end

  def profesor
  end

  def admin
  end

  private

  def set_auth
  	@auth = session[:omniauth] if session[:omniauth]
  end
end
