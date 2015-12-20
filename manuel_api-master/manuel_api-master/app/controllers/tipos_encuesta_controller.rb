class TiposEncuestaController < ApplicationController
  before_action :set_tipos_encuestum, only: [:show, :edit, :update, :destroy]

  # GET /tipos_encuesta
  # GET /tipos_encuesta.json
  def index
    @tipos_encuesta = TiposEncuestum.all
  end

  # GET /tipos_encuesta/1
  # GET /tipos_encuesta/1.json
  def show
  end

  # GET /tipos_encuesta/new
  def new
    @tipos_encuestum = TiposEncuestum.new
  end

  # GET /tipos_encuesta/1/edit
  def edit
  end

  # POST /tipos_encuesta
  # POST /tipos_encuesta.json
  def create
    @tipos_encuestum = TiposEncuestum.new(tipos_encuestum_params)

    respond_to do |format|
      if @tipos_encuestum.save
        format.html { redirect_to @tipos_encuestum, notice: 'Tipos encuestum was successfully created.' }
        format.json { render :show, status: :created, location: @tipos_encuestum }
      else
        format.html { render :new }
        format.json { render json: @tipos_encuestum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tipos_encuesta/1
  # PATCH/PUT /tipos_encuesta/1.json
  def update
    respond_to do |format|
      if @tipos_encuestum.update(tipos_encuestum_params)
        format.html { redirect_to @tipos_encuestum, notice: 'Tipos encuestum was successfully updated.' }
        format.json { render :show, status: :ok, location: @tipos_encuestum }
      else
        format.html { render :edit }
        format.json { render json: @tipos_encuestum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tipos_encuesta/1
  # DELETE /tipos_encuesta/1.json
  def destroy
    @tipos_encuestum.destroy
    respond_to do |format|
      format.html { redirect_to tipos_encuesta_url, notice: 'Tipos encuestum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tipos_encuestum
      @tipos_encuestum = TiposEncuestum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tipos_encuestum_params
      params.require(:tipos_encuestum).permit(:nombre)
    end
end
