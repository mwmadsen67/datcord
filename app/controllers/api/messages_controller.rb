class Api::MessagesController < ApplicationController

  before_action :require_logged_in

  def create
    @message = Message.new(message_params)
  
    if @message.save
      ChannelsChannel.broadcast_to @message.channel, type: 'RECEIVE_MESSAGE',
        **from_template('api/messages/show', message: @message)
      render :show, locals: { message: @message }
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    ChannelsChannel.broadcast_to @message.channel, type: 'DESTROY_MESSAGE',
      id: @message.id
    render json: nil, status: :ok
  end

  private

  def message_params
    params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
  end
  
end
