class Api::ServersController < ApplicationController

  def show
    @server = Server.find_by(id: params[:id])
    render :show
  end

  def index
    @servers = current_user.servers_subscribed_to
    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      ServerSubscription.create(server_id: @server.id, user_id: current_user.id)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def update
    @server = Server.find_by(id: params[:id])
    if @server.update(server_params)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    if current_user.id == @server.owner_id
      @server.destroy
      render json: ['Successfully deleted']
    else
      render json: ["You can not do that"]
    end
  end

  def server_params
    params.require(:server).permit(:name)
  end
  
end
