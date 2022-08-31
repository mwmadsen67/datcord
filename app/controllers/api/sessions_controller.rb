class Api::SessionsController < ApplicationController

  def show
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user
      login!(@user)
      render :show
    else
      render json: {errors: ['Login or password is invalid']}, status: :unauthorized
    end
  end
  
end
