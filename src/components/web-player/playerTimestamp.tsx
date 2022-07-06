import React, { useEffect } from 'react'
import { usePlaybackState } from 'react-spotify-web-playback-sdk';
import { useDispatch } from 'react-redux';

const PlayerTimestamp: React.FC = () => {
  const playbackState = usePlaybackState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!playbackState) return;
    
    dispatch({ type: 'spotifyPlayer/setCurrentTime', payload: {
      position: Number((playbackState.position / 1000).toFixed(0))
    }})
  }, [playbackState])

  return <div>
  </div>
};

export default PlayerTimestamp;