import React, { useEffect, useState } from 'react'
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/store';

const PlayerLyrics: React.FC = () => {

  const { currentSong } = useSelector((state: RootState) => state.spotifyPlayer);
  const [error, setError] = useState('');
  const device = usePlayerDevice();
  const dispatch = useDispatch();

  const getLyrics = async() => {
    if(!currentSong || !device) return;

    const newLyrics = await fetch(`http://localhost:8888/lyrics/getSongLyrics?songName=${currentSong.name}&artistName=${currentSong.artist}`, {
			method: 'get'
		});
    const newLyricsJson = await newLyrics.json();

    if(newLyricsJson?.error) setError(newLyricsJson.error)

    dispatch({ type: 'spotifyPlayer/setCurrentSongLyrics', payload: {
      lyrics: newLyricsJson
    }})
  }

  useEffect(() => {
    getLyrics()
  }, [currentSong.uri]);

  return <p>
    { 
      !error && currentSong.lyrics.length > 0 ? 'Lyrics are available' : error  
    }
  </p>
}

export default PlayerLyrics;