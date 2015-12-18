class EncuestasController < ApplicationController
  before_action :set_encuesta, only: [:show, :edit, :update, :destroy]

  # GET /encuesta
  # GET /encuesta.json
  def index
    @encuestas = Encuesta.all
  end

  # GET /encuesta/1
  # GET /encuesta/1.json
  def show
  end

  # GET /encuesta/new
  def new
    @encuesta = Encuesta.new
  end

  # GET /encuesta/1/edit
  def edit
  end

  # POST /encuesta
  # POST /encuesta.json
  def create
    @encuesta = Encuesta.new(encuesta_params)

    respond_to do |format|
      if @encuesta.save
        format.html { redirect_to @encuesta, notice: 'Encuesta was successfully created.' }
        format.json { render :show, status: :created, location: @encuesta }
      else
        format.html { render :new }
        format.json { render json: @encuesta.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /encuesta/1
  # PATCH/PUT /encuesta/1.json
  def update
    respond_to do |format|
      if @encuesta.update(encuesta_params)
        format.html { redirect_to @encuesta, notice: 'Encuesta was successfully updated.' }
        format.json { render :show, status: :ok, location: @encuesta }
      else
        format.html { render :edit }
        format.json { render json: @encuesta.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /encuesta/1
  # DELETE /encuesta/1.json
  def destroy
    @encuesta.destroy
    respond_to do |format|
      format.html { redirect_to encuestas_url, notice: 'Encuesta was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_encuesta
      @encuesta = Encuesta.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def encuesta_params
      params.require(:encuesta).permit(:Encuesta_id, :Encuesta_estado, :Encuesta_nombre, :Encuesta_descripcion)
    end
end
