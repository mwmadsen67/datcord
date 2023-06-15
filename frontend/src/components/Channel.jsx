import consumer from '../consumer'

function Channel() {
  
  useEffect( () => {
    const subscription = consumer.subscriptions.create(
      {channel: 'ChannelsChannel', id: channelId}
    );

    return () => subscription?.unsubscribe();
  }, [channelId, dispatch])
  
}

export default Channel;