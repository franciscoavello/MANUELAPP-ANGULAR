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
      post :create, encuestum: { Encuesta_descripcion: @encuestum.Encuesta_descripcion, Encuesta_estado: @encuestum.Encuesta_estado, Encuesta_id: @encuestum.Encuesta_id, Encuesta_nombre: @encuestum.Encuesta_nombre }
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
    patch :update, id: @encuestum, encuestum: { Encuesta_descripcion: @encuestum.Encuesta_descripcion, Encuesta_estado: @encuestum.Encuesta_estado, Encuesta_id: @encuestum.Encuesta_id, Encuesta_nombre: @encuestum.Encuesta_nombre }
    assert_redirected_to encuestum_path(assigns(:encuestum))
  end

  test "should destroy encuestum" do
    assert_difference('Encuestum.count', -1) do
      delete :destroy, id: @encuestum
    end

    assert_redirected_to encuesta_path
  end
end
