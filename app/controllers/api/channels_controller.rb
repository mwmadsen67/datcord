class Api::ChannelsController < ApplicationController

  def show
    @channel = Channel.find_by(id: params[:id])
    render :show
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if current_user.id == @channel.server.owner.id
      @channel.destroy
      render json: ["Channel Successfully Destroyed"]
    else
      render json: ["You are not the server owner, so you can not do that"]
    end
  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
  
end
