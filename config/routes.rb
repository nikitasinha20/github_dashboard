Rails.application.routes.draw do

  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')
  delete 'signout', to: 'sessions#destroy', as: 'signout'
  root to: 'sessions#new'

  get '/users/:id', to: 'users#show', as: 'user'
  get '/users/repo/details', to: 'users#show_repo_details', as: 'details'
  get '/users/repo/data', to: 'users#data', :defaults => { :format => 'json' }

end
