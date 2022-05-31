import React, { useEffect } from 'react'
import { usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

const PlaySong: React.FC = () => {

  const currentSong: string = useSelector((state: RootState) => state.spotifyPlayer.currentSong);
  const aToken: string = useSelector((state: RootState) => state.auth.accessToken);
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();

  const getNextSong = async() => {
    if(!currentSong || !device) return;

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
			method: 'put',
      body: JSON.stringify({ uris: [currentSong] }),
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`,
      })
		});
  }

  useEffect(() => {
    getNextSong()
  }, [currentSong])

  if (playbackState === null) return null;
  return <p>
    { playbackState.track_window.current_track.name }
  </p>
};

export default PlaySong;