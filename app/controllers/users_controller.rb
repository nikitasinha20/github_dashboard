require 'json'

class UsersController < ApplicationController
    GIT_API_URL = 'https://api.github.com'

    def show
        user = User.find(params[:id])
        client_id = Rails.application.secrets.github_client_id
        client_secret = Rails.application.secrets.github_client_secret
        github_connection = Github.new :client_id => client_id, :client_secret => client_secret, :oauth_token => user.oauth_token
        session[:github_connection] = github_connection
        # github_connection = session[:github_connection]
        # puts "===================================",github_connection
        @repos = github_connection.repos.list user: "#{user.username}"
    end

    def show_repo_details
        @current_repo = params[:name]
        @repo_description = params[:description]
        @start_date = params[:start_date].presence || ""
        @end_date = params[:end_date].presence || ""
    end

    def data
        repo = params[:repo]
        start_date = params[:start_date]
        end_date = params[:end_date]
        # github_connection = session[:github_connection]
        client_id = Rails.application.secrets.github_client_id
        client_secret = Rails.application.secrets.github_client_secret
        github_connection = Github.new :client_id => client_id, :client_secret => client_secret, :oauth_token => current_user.oauth_token
        @commits = github_connection.repos.commits.list current_user.username, repo
        commits = filter_commits(@commits, start_date, end_date);
        respond_to do |format|
            format.json {
              render :json => commits
            }
        end
    end

    private

    def filter_commits(commits, start_date = nil, end_date = nil)
        valid_commits = []
        if start_date != "" && end_date != ""
            puts "$$$$$$$$$$$$$$$ IN IF"
            commits.each do |commit|
                date = commit.commit.committer.date.to_date
                if date > start_date.to_date && date < end_date.to_date
                    valid_commits.push(commit)
                end
            end
        else
            valid_commits = commits
        end
        
        valid_commits
    end


end
