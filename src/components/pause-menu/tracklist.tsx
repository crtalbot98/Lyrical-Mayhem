import React, { useEffect, useState } from 'react'
import { GenericObject } from '../../types';
import { useMenuContext } from './menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';
import { getPlaylistById } from './playlist';

const Tracklist: React.FC = () => {
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const device = usePlayerDevice();
	const context = useMenuContext();
	const dispatch = useDispatch();
	const selectedPlaylist = getPlaylistById(context.playlists, context.selectedPlaylistId);
	const [offset, setOffset] = useState(0);
	const [trackList, setTrackList] = useState([]);
	const [loading, setLoading] = useState(true);

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

	const getTracksOnScroll = async(evt: React.UIEvent<HTMLUListElement, UIEvent>) => {
		if(evt.target.scrollTop !== evt.target.scrollHeight - evt.target.offsetHeight) return;

		setOffset(offset + 20);
		getTracks()
	}

	const getTracks = async() => {
		if(!selectedPlaylist) {
			setTrackList([]);
			return
		}
		setLoading(true);
		const tracks = await fetch(selectedPlaylist.tracks.href + '?offset=' + (trackList.length + offset), {
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});
		const tracksJson = await tracks.json();
		
		setTrackList([...trackList, ...tracksJson.items]);
		setLoading(false);
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

	const tracklistItems = trackList.map((item: GenericObject) => {
		let seconds: string|number = Math.floor((item.track.duration_ms / 1000) % 60);
  	let minutes: string|number = Math.floor((item.track.duration_ms / 1000 / 60));

		if(seconds < 10) seconds = '0' + seconds;

		return <li 
			className='flex space-x-2 hover:border-orange w-full'
      key={item.track.id} 
      onClick={() => { 
				playAndSetTrack(item.track);
				getLyrics(item.track.name, item.track.artists[0].name)
      }}
    >
			<img className='h-auto' height='45' width='45' src={item.track.album.images[2].url} alt={`${item.track.name} album art`} />
			<p className='flex flex-col'>
				{item.track.name}
				<span className='text-white'>{item.track.artists[0].name}</span>
			</p>
			<p>{item.track.album.name}</p>
			<p>{`${minutes}:${seconds}`}</p>
		</li>
	});

	useEffect(() => {
		getTracks()
	}, [selectedPlaylist]);

  return <>
		<ul 
			className='overflow-y-auto overflow-x-hidden space-y-2 max-h-96 animate-slideOpen'
			onScroll={getTracksOnScroll}
		>
			{ tracklistItems }
		</ul>
		{ loading ? <div className='border-md h-14 w-14 animate-spin'></div> : null }
	</>
};

export default Tracklist;