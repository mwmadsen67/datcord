class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user
      login!(user)
      render json: user
    else
      render json: {errors: ['Login or password is invalid']}, status: :unauthorized
    end
  end
  
end
