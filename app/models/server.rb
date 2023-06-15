class Server < ApplicationRecord
  validates :name, presence: true

  after_initialize :generate_general_channel

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :channels,
    dependent: :destroy

  has_many :server_subscriptions,
    dependent: :destroy

  has_many :users,
    through: :server_subscriptions,
    source: :user

  def generate_general_channel
    if self.channels.length == 0
      Channel.create(server_id: self.id, name: 'general')
    end
  end
  
end
