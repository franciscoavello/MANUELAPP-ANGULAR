require 'test_helper'

class ProfesoresControllerTest < ActionController::TestCase
  setup do
    @profesore = profesores(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:profesores)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create profesore" do
    assert_difference('Profesore.count') do
      post :create, profesore: { apellido_materno: @profesore.apellido_materno, apellido_paterno: @profesore.apellido_paterno, descripcion: @profesore.descripcion, nombre: @profesore.nombre, usuario_id: @profesore.usuario_id }
    end

    assert_redirected_to profesore_path(assigns(:profesore))
  end

  test "should show profesore" do
    get :show, id: @profesore
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @profesore
    assert_response :success
  end

  test "should update profesore" do
    patch :update, id: @profesore, profesore: { apellido_materno: @profesore.apellido_materno, apellido_paterno: @profesore.apellido_paterno, descripcion: @profesore.descripcion, nombre: @profesore.nombre, usuario_id: @profesore.usuario_id }
    assert_redirected_to profesore_path(assigns(:profesore))
  end

  test "should destroy profesore" do
    assert_difference('Profesore.count', -1) do
      delete :destroy, id: @profesore
    end

    assert_redirected_to profesores_path
  end
end
