import React, { MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/store';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

const PlayBtn: React.FC = () => {
  const dispatch = useDispatch();
  const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);
  const spotifyPlayer = useSpotifyPlayer();

  const updatePlayState = async(evt: MouseEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();
    
    const newPlayingState = !playing;
    dispatch({ type: 'spotifyPlayer/setPlaying', payload: { playing: newPlayingState } });
    !newPlayingState ? spotifyPlayer.pause() : spotifyPlayer.resume()
  }

  return <button 
    className='h-20 w-20 bg-lightText rounded-full self-center flex justify-center items-center'
    onClick={updatePlayState}
  >
    { playing ? <img src="./player-pause.svg" alt="Pause" /> : <img src="./player-play.svg" alt="Play" /> }
  </button>
};

export default PlayBtn;