import React from 'react'
import { GenericObject } from '../../types';
import { useMenuContext } from './context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

const Tracklist: React.FC = () => {
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const deviceId = useSelector((state: RootState) => state.spotifyPlayer.playerDetails.deviceId);
	const context = useMenuContext();
	const dispatch = useDispatch();

	const playTrack = async(uri: string) => {
		await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
			method: 'put',
			body: JSON.stringify({ uris: [uri] }),
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});
	}

	const getLyrics = async(songName: string, artist: string) => {
    const newLyrics = await fetch(`http://localhost:8888/lyrics/getSongLyrics?songName=${songName}&artistName=${artist}`);
    const newLyricsJson = await newLyrics.json();

    dispatch({ type: 'spotifyPlayer/setCurrentSongLyrics', payload: {
      lyrics: newLyricsJson
    }})
  }

	const tracklistItems = context.trackList.map((item: GenericObject) => {
		return <li 
      key={item.track.id} 
      onClick={() => { 
				playTrack(item.track.uri);
				getLyrics(item.track.name, item.track.artists[0].name)
      }}
    >
			<p>{item.track.name}</p>
			<p className='text-white'>{item.track.artists[0].name}</p>
		</li>
	});

  return <ul className='overflow-y-auto max-h-96'>
		{context.trackList.length > 0 ? tracklistItems : null}
	</ul>
};

export default Tracklist;