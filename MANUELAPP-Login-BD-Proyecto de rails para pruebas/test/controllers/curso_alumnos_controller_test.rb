require 'test_helper'

class CursoAlumnosControllerTest < ActionController::TestCase
  setup do
    @curso_alumno = curso_alumnos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:curso_alumnos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create curso_alumno" do
    assert_difference('CursoAlumno.count') do
      post :create, curso_alumno: { Curso_Alumno_id: @curso_alumno.Curso_Alumno_id }
    end

    assert_redirected_to curso_alumno_path(assigns(:curso_alumno))
  end

  test "should show curso_alumno" do
    get :show, id: @curso_alumno
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @curso_alumno
    assert_response :success
  end

  test "should update curso_alumno" do
    patch :update, id: @curso_alumno, curso_alumno: { Curso_Alumno_id: @curso_alumno.Curso_Alumno_id }
    assert_redirected_to curso_alumno_path(assigns(:curso_alumno))
  end

  test "should destroy curso_alumno" do
    assert_difference('CursoAlumno.count', -1) do
      delete :destroy, id: @curso_alumno
    end

    assert_redirected_to curso_alumnos_path
  end
end
