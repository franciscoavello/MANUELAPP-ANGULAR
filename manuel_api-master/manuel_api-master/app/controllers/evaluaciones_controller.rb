class EvaluacionesController < ApplicationController
  before_action :set_evaluacione, only: [:show, :edit, :update, :destroy]

  # GET /evaluaciones
  # GET /evaluaciones.json
  def index
    @evaluaciones = Evaluacione.all
  end

  # GET /evaluaciones/1
  # GET /evaluaciones/1.json
  def show
  end

  # GET /evaluaciones/new
  def new
    @evaluacione = Evaluacione.new
  end

  # GET /evaluaciones/1/edit
  def edit
  end

  # POST /evaluaciones
  # POST /evaluaciones.json
  def create
    @evaluacione = Evaluacione.new(evaluacione_params)

    respond_to do |format|
      if @evaluacione.save
        format.html { redirect_to @evaluacione, notice: 'Evaluacione was successfully created.' }
        format.json { render :show, status: :created, location: @evaluacione }
      else
        format.html { render :new }
        format.json { render json: @evaluacione.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /evaluaciones/1
  # PATCH/PUT /evaluaciones/1.json
  def update
    respond_to do |format|
      if @evaluacione.update(evaluacione_params)
        format.html { redirect_to @evaluacione, notice: 'Evaluacione was successfully updated.' }
        format.json { render :show, status: :ok, location: @evaluacione }
      else
        format.html { render :edit }
        format.json { render json: @evaluacione.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /evaluaciones/1
  # DELETE /evaluaciones/1.json
  def destroy
    @evaluacione.destroy
    respond_to do |format|
      format.html { redirect_to evaluaciones_url, notice: 'Evaluacione was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evaluacione
      @evaluacione = Evaluacione.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evaluacione_params
      params.require(:evaluacione).permit(:contestada, :curso_id, :encuesta_id)
    end
end
