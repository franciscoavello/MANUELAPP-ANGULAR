require 'test_helper'

class TipoEncuestaControllerTest < ActionController::TestCase
  setup do
    @tipo_encuestum = tipo_encuesta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tipo_encuesta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tipo_encuestum" do
    assert_difference('TipoEncuestum.count') do
      post :create, tipo_encuestum: { Tipo_id: @tipo_encuestum.Tipo_id, Tipo_nombre: @tipo_encuestum.Tipo_nombre }
    end

    assert_redirected_to tipo_encuestum_path(assigns(:tipo_encuestum))
  end

  test "should show tipo_encuestum" do
    get :show, id: @tipo_encuestum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tipo_encuestum
    assert_response :success
  end

  test "should update tipo_encuestum" do
    patch :update, id: @tipo_encuestum, tipo_encuestum: { Tipo_id: @tipo_encuestum.Tipo_id, Tipo_nombre: @tipo_encuestum.Tipo_nombre }
    assert_redirected_to tipo_encuestum_path(assigns(:tipo_encuestum))
  end

  test "should destroy tipo_encuestum" do
    assert_difference('TipoEncuestum.count', -1) do
      delete :destroy, id: @tipo_encuestum
    end

    assert_redirected_to tipo_encuesta_path
  end
end
