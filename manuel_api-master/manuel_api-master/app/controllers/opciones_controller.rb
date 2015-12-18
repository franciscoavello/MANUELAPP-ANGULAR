class OpcionesController < ApplicationController
  before_action :set_opcione, only: [:show, :edit, :update, :destroy]

  # GET /opciones
  # GET /opciones.json
  def index
    @opciones = Opcione.all
  end

  # GET /opciones/1
  # GET /opciones/1.json
  def show
  end

  # GET /opciones/new
  def new
    @opcione = Opcione.new
  end

  # GET /opciones/1/edit
  def edit
  end

  # POST /opciones
  # POST /opciones.json
  def create
    @opcione = Opcione.new(opcione_params)

    respond_to do |format|
      if @opcione.save
        format.html { redirect_to @opcione, notice: 'Opcione was successfully created.' }
        format.json { render :show, status: :created, location: @opcione }
      else
        format.html { render :new }
        format.json { render json: @opcione.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /opciones/1
  # PATCH/PUT /opciones/1.json
  def update
    respond_to do |format|
      if @opcione.update(opcione_params)
        format.html { redirect_to @opcione, notice: 'Opcione was successfully updated.' }
        format.json { render :show, status: :ok, location: @opcione }
      else
        format.html { render :edit }
        format.json { render json: @opcione.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /opciones/1
  # DELETE /opciones/1.json
  def destroy
    @opcione.destroy
    respond_to do |format|
      format.html { redirect_to opciones_url, notice: 'Opcione was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opcione
      @opcione = Opcione.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def opcione_params
      params.require(:opcione).permit(:valor, :opcion_text, :pregunta_id)
    end
end
