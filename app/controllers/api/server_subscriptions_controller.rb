class Api::ServerSubscriptionsController < ApplicationController

  def create
    @server_subscription = ServerSubscription.new(server_subscription_params)
    if @server_subscription.save
      render json: @server_subscription
    else
      render json: @server_subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @server_subscription = ServerSubscription.find_by(id: params[:id])
    if @server_subscription
      @server_subscription.destroy
      render json: ["Success"]
    else
      render json: ["Could not find that user"]
    end
  end

  def server_subscription_params
    params.require(:server_subscription).permit(:user_id, :server_id)
  end
  
end
