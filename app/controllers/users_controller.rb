class UsersController < ApplicationController
    GIT_API_URL = 'https://api.github.com'

    def show
        user = User.find(params[:id])
        @repos = Github.repos.list user: "#{user.username}"
    end

    def show_repo_details
        @current_repo = params[:name]
        @repo_description = params[:description]
        @details = Github.repos.commits.all  "#{current_user.username}", "#{params[:name]}"
        respond_to do |format|
            format.json {
              render :json => @details
            }
        end
    end

end
