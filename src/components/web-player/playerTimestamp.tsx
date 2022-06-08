import React, { useEffect } from 'react'
import { usePlaybackState } from 'react-spotify-web-playback-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/store';

const PlayerTimestamp: React.FC = () => {

  const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);
  const playbackState = usePlaybackState(true, 100);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!playbackState) return;
    
    dispatch({ type: 'spotifyPlayer/setSongLengthAndCurrentTime', payload: {
      position: (playbackState.position / 1000).toFixed(0),
      length: (playbackState.duration / 1000).toFixed(0)
    }});
  }, [playbackState])

  return <div>
  </div>
};

export default PlayerTimestamp;