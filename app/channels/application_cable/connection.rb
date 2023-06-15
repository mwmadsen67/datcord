module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # this line lets you call `current_user` directly from your channel instances
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private
    def find_verified_user
      if current_user = User.find_by(session_token: request.session[:session_token])
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
