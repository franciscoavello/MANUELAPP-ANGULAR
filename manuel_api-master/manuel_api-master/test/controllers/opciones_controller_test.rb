require 'test_helper'

class OpcionesControllerTest < ActionController::TestCase
  setup do
    @opcione = opciones(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:opciones)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create opcione" do
    assert_difference('Opcione.count') do
      post :create, opcione: { opcion_text: @opcione.opcion_text, pregunta_id: @opcione.pregunta_id, valor: @opcione.valor }
    end

    assert_redirected_to opcione_path(assigns(:opcione))
  end

  test "should show opcione" do
    get :show, id: @opcione
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @opcione
    assert_response :success
  end

  test "should update opcione" do
    patch :update, id: @opcione, opcione: { opcion_text: @opcione.opcion_text, pregunta_id: @opcione.pregunta_id, valor: @opcione.valor }
    assert_redirected_to opcione_path(assigns(:opcione))
  end

  test "should destroy opcione" do
    assert_difference('Opcione.count', -1) do
      delete :destroy, id: @opcione
    end

    assert_redirected_to opciones_path
  end
end
