Rails.application.routes.draw do
  resources :opcions
  resources :pregunta
  resources :encuesta_pregunta
  resources :encuestas
  resources :grupos
  resources :curso_alumnos
  resources :respuesta
  resources :evaluacions
  resources :tipo_encuesta
  resources :cursos
  resources :usuarios


  get 'static_pages/home'

  root 'static_pages#home'
  get 'static_pages/alumno'
  get 'auth/:provider/callback', to: "sessions#create"
  delete 'sign_out', to: "sessions#destroy", as: 'sign_out'
end
