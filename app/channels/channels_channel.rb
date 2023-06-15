class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    @channel = Channel.find_by(id: params[:id])
    stream_for @channel
  end

  def receive(data)
    self.class.broadcast_to(@channel, data)
  end

  def react(reaction)
    self.class.broadcast_to @channel, 
      type: 'RECEIVE_REACTION',
      id: current_user.id,
      **reaction
  end
end