require 'test_helper'

class EncuestaPreguntaControllerTest < ActionController::TestCase
  setup do
    @encuesta_preguntum = encuesta_pregunta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:encuesta_pregunta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create encuesta_preguntum" do
    assert_difference('EncuestaPreguntum.count') do
      post :create, encuesta_preguntum: { Encuesta_Pregunta_id: @encuesta_preguntum.Encuesta_Pregunta_id }
    end

    assert_redirected_to encuesta_preguntum_path(assigns(:encuesta_preguntum))
  end

  test "should show encuesta_preguntum" do
    get :show, id: @encuesta_preguntum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @encuesta_preguntum
    assert_response :success
  end

  test "should update encuesta_preguntum" do
    patch :update, id: @encuesta_preguntum, encuesta_preguntum: { Encuesta_Pregunta_id: @encuesta_preguntum.Encuesta_Pregunta_id }
    assert_redirected_to encuesta_preguntum_path(assigns(:encuesta_preguntum))
  end

  test "should destroy encuesta_preguntum" do
    assert_difference('EncuestaPreguntum.count', -1) do
      delete :destroy, id: @encuesta_preguntum
    end

    assert_redirected_to encuesta_pregunta_path
  end
end
