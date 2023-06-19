import consumer from '../../consumer'
import { useEffect, useParams } from 'react';
import { useDispatch } from 'react-redux';

function Channel() {
  const channelId = useParams();
  const dispatch = useDispatch();

  useEffect( () => {
    const subscription = consumer.subscriptions.create(
      {channel: 'ChannelsChannel', id: channelId},
      {
        received: message => {
          console.log('Received message: ', message);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [channelId, dispatch])

  return (
    
  )
  
}

export default Channel;