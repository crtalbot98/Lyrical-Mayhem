import React, { useEffect } from 'react'
import { usePlayerDevice, usePlaybackState, useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { fetchSpotifyData } from '../hooks/fetchSpotifyData';

const PlaySong: React.FC = () => {

  const { currentSong, playing } = useSelector((state: RootState) => state.spotifyPlayer);
  const aToken: string = useSelector((state: RootState) => state.auth.accessToken);
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();
  const spotifyPlayer = useSpotifyPlayer();

  const getNextSong = async() => {
    if(!currentSong || !device) return;

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
			method: 'put',
      body: JSON.stringify({ uris: [currentSong.uri] }),
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`
      })
		});
  }

  useEffect(() => {
    getNextSong()
  }, [currentSong.uri])

  useEffect(() => {
    if(!spotifyPlayer) return;

    if(!playing) spotifyPlayer.pause() ;
    else spotifyPlayer.resume()
  }, [playing])

  if (!playbackState) return null;
  return <p>
    { playbackState.track_window.current_track.name }
  </p>
};

export default PlaySong;