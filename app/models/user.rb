class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :username, length: { in: 6..36 }
  validates :username, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, length: { in: 3..255 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 8..128 }, allow_nil: true
  # validates :name, length: { in: 2..32 }

  before_validation :ensure_session_token

  has_secure_password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && authenticate(password)
    nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def username=(username)
    name = generate_username(username)
    super(name)
  end

  def generate_username(username)
    nametag = "#{username}##{rand(1000..9999)}"
    while User.exists?(nametag)
      nametag = "#{username}##{rand(1000..9999)}"
    end
    nametag
  end
  
  private

  def generate_unique_session_token
    token = SecureRandom.urlsafe_base64
    while User.exists?(token)
      token = SecureRandom.urlsafe_base64
    end
    return token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
  
end
