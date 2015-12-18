class TipoEncuestaController < ApplicationController
  before_action :set_tipo_encuestum, only: [:show, :edit, :update, :destroy]

  # GET /tipo_encuesta
  # GET /tipo_encuesta.json
  def index
    @tipo_encuesta = TipoEncuestum.all
  end

  # GET /tipo_encuesta/1
  # GET /tipo_encuesta/1.json
  def show
  end

  # GET /tipo_encuesta/new
  def new
    @tipo_encuestum = TipoEncuestum.new
  end

  # GET /tipo_encuesta/1/edit
  def edit
  end

  # POST /tipo_encuesta
  # POST /tipo_encuesta.json
  def create
    @tipo_encuestum = TipoEncuestum.new(tipo_encuestum_params)

    respond_to do |format|
      if @tipo_encuestum.save
        format.html { redirect_to @tipo_encuestum, notice: 'Tipo encuestum was successfully created.' }
        format.json { render :show, status: :created, location: @tipo_encuestum }
      else
        format.html { render :new }
        format.json { render json: @tipo_encuestum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tipo_encuesta/1
  # PATCH/PUT /tipo_encuesta/1.json
  def update
    respond_to do |format|
      if @tipo_encuestum.update(tipo_encuestum_params)
        format.html { redirect_to @tipo_encuestum, notice: 'Tipo encuestum was successfully updated.' }
        format.json { render :show, status: :ok, location: @tipo_encuestum }
      else
        format.html { render :edit }
        format.json { render json: @tipo_encuestum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tipo_encuesta/1
  # DELETE /tipo_encuesta/1.json
  def destroy
    @tipo_encuestum.destroy
    respond_to do |format|
      format.html { redirect_to tipo_encuesta_url, notice: 'Tipo encuestum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tipo_encuestum
      @tipo_encuestum = TipoEncuestum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tipo_encuestum_params
      params.require(:tipo_encuestum).permit(:Tipo_id, :Tipo_nombre)
    end
end
