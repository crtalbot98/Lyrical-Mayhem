import React, { useEffect } from 'react'
import { usePlayerDevice, usePlaybackState, useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';

const PlaySong: React.FC = () => {

  const currentSong = useSelector((state: RootState) => state.spotifyPlayer.currentSong);
  const aToken: string = useSelector((state: RootState) => state.auth.accessToken);
  const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();
  const player = useSpotifyPlayer();
  const dispatch = useDispatch();

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

  const getLyrics = async() => {
    if(!currentSong || !device) return;

    const newLyrics = await fetch(`http://localhost:8888/lyrics/getSongLyrics?songName=${currentSong.name}&artistName=${currentSong.artist}`, {
			method: 'get'
		});

    const newLyricsJson = await newLyrics.json();

    dispatch({ type: 'spotifyPlayer/setCurrentSongLyrics', payload: {
      lyrics: newLyricsJson
    }})
  }

  useEffect(() => {
    getNextSong();
    getLyrics()
  }, [currentSong.uri])

  useEffect(() => {
    if(!player) return;

    if(!playing) player.pause()
    else player.resume()
  }, [playing])

  if (playbackState === null) return null;
  return <p>
    { playbackState.track_window.current_track.name }
  </p>
};

export default PlaySong;