class EncuestaPreguntaController < ApplicationController
  before_action :set_encuesta_preguntum, only: [:show, :edit, :update, :destroy]

  # GET /encuesta_pregunta
  # GET /encuesta_pregunta.json
  def index
    @encuesta_pregunta = EncuestaPreguntum.all
  end

  # GET /encuesta_pregunta/1
  # GET /encuesta_pregunta/1.json
  def show
  end

  # GET /encuesta_pregunta/new
  def new
    @encuesta_preguntum = EncuestaPreguntum.new
  end

  # GET /encuesta_pregunta/1/edit
  def edit
  end

  # POST /encuesta_pregunta
  # POST /encuesta_pregunta.json
  def create
    @encuesta_preguntum = EncuestaPreguntum.new(encuesta_preguntum_params)

    respond_to do |format|
      if @encuesta_preguntum.save
        format.html { redirect_to @encuesta_preguntum, notice: 'Encuesta preguntum was successfully created.' }
        format.json { render :show, status: :created, location: @encuesta_preguntum }
      else
        format.html { render :new }
        format.json { render json: @encuesta_preguntum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /encuesta_pregunta/1
  # PATCH/PUT /encuesta_pregunta/1.json
  def update
    respond_to do |format|
      if @encuesta_preguntum.update(encuesta_preguntum_params)
        format.html { redirect_to @encuesta_preguntum, notice: 'Encuesta preguntum was successfully updated.' }
        format.json { render :show, status: :ok, location: @encuesta_preguntum }
      else
        format.html { render :edit }
        format.json { render json: @encuesta_preguntum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /encuesta_pregunta/1
  # DELETE /encuesta_pregunta/1.json
  def destroy
    @encuesta_preguntum.destroy
    respond_to do |format|
      format.html { redirect_to encuesta_pregunta_url, notice: 'Encuesta preguntum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_encuesta_preguntum
      @encuesta_preguntum = EncuestaPreguntum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def encuesta_preguntum_params
      params.require(:encuesta_preguntum).permit(:Encuesta_Pregunta_id)
    end
end
