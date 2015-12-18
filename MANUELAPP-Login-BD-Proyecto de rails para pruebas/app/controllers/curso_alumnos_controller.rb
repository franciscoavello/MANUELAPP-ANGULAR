class CursoAlumnosController < ApplicationController
  before_action :set_curso_alumno, only: [:show, :edit, :update, :destroy]

  # GET /curso_alumnos
  # GET /curso_alumnos.json
  def index
    @curso_alumnos = CursoAlumno.all
  end

  # GET /curso_alumnos/1
  # GET /curso_alumnos/1.json
  def show
  end

  # GET /curso_alumnos/new
  def new
    @curso_alumno = CursoAlumno.new
  end

  # GET /curso_alumnos/1/edit
  def edit
  end

  # POST /curso_alumnos
  # POST /curso_alumnos.json
  def create
    @curso_alumno = CursoAlumno.new(curso_alumno_params)

    respond_to do |format|
      if @curso_alumno.save
        format.html { redirect_to @curso_alumno, notice: 'Curso alumno was successfully created.' }
        format.json { render :show, status: :created, location: @curso_alumno }
      else
        format.html { render :new }
        format.json { render json: @curso_alumno.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /curso_alumnos/1
  # PATCH/PUT /curso_alumnos/1.json
  def update
    respond_to do |format|
      if @curso_alumno.update(curso_alumno_params)
        format.html { redirect_to @curso_alumno, notice: 'Curso alumno was successfully updated.' }
        format.json { render :show, status: :ok, location: @curso_alumno }
      else
        format.html { render :edit }
        format.json { render json: @curso_alumno.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /curso_alumnos/1
  # DELETE /curso_alumnos/1.json
  def destroy
    @curso_alumno.destroy
    respond_to do |format|
      format.html { redirect_to curso_alumnos_url, notice: 'Curso alumno was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_curso_alumno
      @curso_alumno = CursoAlumno.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def curso_alumno_params
      params.require(:curso_alumno).permit(:Curso_Alumno_id)
    end
end
