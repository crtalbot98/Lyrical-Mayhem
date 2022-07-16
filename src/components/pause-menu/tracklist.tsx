import React from 'react'
import { GenericObject } from '../../types';
import { useMenuContext } from './context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';

const Tracklist: React.FC = () => {
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const device = usePlayerDevice();
	const context = useMenuContext();
	const dispatch = useDispatch();

	const playAndSetTrack = async(track: GenericObject) => {
		await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
			method: 'put',
			body: JSON.stringify({ uris: [track.uri] }),
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});

		dispatch({ type: 'spotifyPlayer/setSongData', payload: {
			id: track.id,
			name: track.name,
			artist: track.artists[0].name,
			length: Number((track.duration_ms / 1000).toFixed(0))
		}})
	}

	const getLyrics = async(songName: string, artist: string) => {
    const newLyrics = await fetch(`http://localhost:8888/lyrics/getSongLyrics?songName=${songName}&artistName=${artist}`);
    const newLyricsJson = await newLyrics.json();

		if(newLyricsJson.error) {
			dispatch({ type: 'spotifyPlayer/setPlayerError', payload: {
				error: newLyricsJson.error
			}});
		}

    dispatch({ type: 'spotifyPlayer/setSongLyrics', payload: {
      lyrics: newLyricsJson.data || []
    }});
  }

	const tracklistItems = context.trackList.map((item: GenericObject) => {
		return <li 
      key={item.track.id} 
      onClick={() => { 
				playAndSetTrack(item.track);
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