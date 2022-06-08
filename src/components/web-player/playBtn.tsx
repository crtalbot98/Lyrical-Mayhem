import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/store';

const PlayBtn: React.FC = () => {

  const dispatch = useDispatch();
  const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);

  const updatePlaying = () => {
    dispatch({ type: 'spotifyPlayer/setPlaying' })
  }

  return <button 
    className=' h-20 w-20 bg-lightText rounded-full self-center'
    onClick={updatePlaying}
  >
    { playing ? 'Pause' : 'Play' }
  </button>
};

export default PlayBtn;