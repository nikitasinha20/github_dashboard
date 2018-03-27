class UsersController < ApplicationController
    GIT_API_URL = 'https://api.github.com'

    def show
        user = User.find(params[:id])
        @repos = Github.repos.list user: "#{user.username}"
    end

    def show_repo_details
    end

    # def data
    #     @current_repo = params[:name]
    #     @repo_description = params[:description]
    #     # github = Github.new login:"#{current_user.username}", password:"#{params[:name]}"
    #     @details = Github.repos.commits.list  "#{current_user.username}","#{params[:name]}"
    #     # @details = github.repos.commits.all  "#{current_user.username}", "#{@current_repo}"
    #     respond_to do |format|
    #         format.json {
    #           render :json => @details
    #         }
    #     end
    # end


end
