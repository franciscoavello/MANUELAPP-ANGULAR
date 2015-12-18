require 'test_helper'

class EncuestaControllerTest < ActionController::TestCase
  setup do
    @encuestum = encuesta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:encuesta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create encuestum" do
    assert_difference('Encuestum.count') do
      post :create, encuestum: { descripcion: @encuestum.descripcion, estado: @encuestum.estado, nombre: @encuestum.nombre, tipo_encuesta_id: @encuestum.tipo_encuesta_id }
    end

    assert_redirected_to encuestum_path(assigns(:encuestum))
  end

  test "should show encuestum" do
    get :show, id: @encuestum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @encuestum
    assert_response :success
  end

  test "should update encuestum" do
    patch :update, id: @encuestum, encuestum: { descripcion: @encuestum.descripcion, estado: @encuestum.estado, nombre: @encuestum.nombre, tipo_encuesta_id: @encuestum.tipo_encuesta_id }
    assert_redirected_to encuestum_path(assigns(:encuestum))
  end

  test "should destroy encuestum" do
    assert_difference('Encuestum.count', -1) do
      delete :destroy, id: @encuestum
    end

    assert_redirected_to encuesta_path
  end
end
