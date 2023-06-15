Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :server, only: [:show, :index, :create, :update, :destroy]
    resources :channels, only: [:show, :create, :update, :destroy]
    resources :server_subscriptions, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
  
end
