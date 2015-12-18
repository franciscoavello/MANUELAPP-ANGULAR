require 'test_helper'

class RespuestaControllerTest < ActionController::TestCase
  setup do
    @respuestum = respuesta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:respuesta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create respuestum" do
    assert_difference('Respuestum.count') do
      post :create, respuestum: { Respuesta_id: @respuestum.Respuesta_id, Respuesta_modulo: @respuestum.Respuesta_modulo }
    end

    assert_redirected_to respuestum_path(assigns(:respuestum))
  end

  test "should show respuestum" do
    get :show, id: @respuestum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @respuestum
    assert_response :success
  end

  test "should update respuestum" do
    patch :update, id: @respuestum, respuestum: { Respuesta_id: @respuestum.Respuesta_id, Respuesta_modulo: @respuestum.Respuesta_modulo }
    assert_redirected_to respuestum_path(assigns(:respuestum))
  end

  test "should destroy respuestum" do
    assert_difference('Respuestum.count', -1) do
      delete :destroy, id: @respuestum
    end

    assert_redirected_to respuesta_path
  end
end
