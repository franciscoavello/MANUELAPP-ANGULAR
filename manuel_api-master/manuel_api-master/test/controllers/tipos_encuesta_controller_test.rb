require 'test_helper'

class TiposEncuestaControllerTest < ActionController::TestCase
  setup do
    @tipos_encuestum = tipos_encuesta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tipos_encuesta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tipos_encuestum" do
    assert_difference('TiposEncuestum.count') do
      post :create, tipos_encuestum: { nombre: @tipos_encuestum.nombre }
    end

    assert_redirected_to tipos_encuestum_path(assigns(:tipos_encuestum))
  end

  test "should show tipos_encuestum" do
    get :show, id: @tipos_encuestum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tipos_encuestum
    assert_response :success
  end

  test "should update tipos_encuestum" do
    patch :update, id: @tipos_encuestum, tipos_encuestum: { nombre: @tipos_encuestum.nombre }
    assert_redirected_to tipos_encuestum_path(assigns(:tipos_encuestum))
  end

  test "should destroy tipos_encuestum" do
    assert_difference('TiposEncuestum.count', -1) do
      delete :destroy, id: @tipos_encuestum
    end

    assert_redirected_to tipos_encuesta_path
  end
end
