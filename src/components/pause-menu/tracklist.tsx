import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { usePlayerDevice } from 'react-spotify-web-playback-sdk';
import LoadingSpinner from '../loadingSpinner';
import type { songLyrics, Song } from '../../stores/reducers/spotify-player-reducer';

const Tracklist: React.FC<{ selectedPlaylist: { trackListUrl: string; id: string; }}> = ({ selectedPlaylist }) => {
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();
	const device = usePlayerDevice();
	const dispatch = useDispatch();
	const tracks = useQuery<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>, Error>(
		['tracklist', selectedPlaylist.id], 
		async() => {
			const tracks = await fetch(selectedPlaylist.trackListUrl, {
				headers: new Headers({
					'Authorization': `Bearer ${aToken}`
				})
			});
			console.log(await tracks.json())
			return tracks.json()
	});
	const songAndLyrics = useQuery<{ lyrics: songLyrics, song: Song }, Error>(
		['track-lyrics', track], 
		async() => {
			if(!track) return;

			const lyrics = await fetch(`http://localhost:8888/lyrics/getSongLyrics?songName=${track.name}&artistName=${track.artists[0]?.name}`);
			const lyricsJson = await lyrics.json();
			console.log(lyricsJson)
			const song = {
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				length: Number((track.duration_ms / 1000).toFixed(0))
			};

			if(lyricsJson.error) {
				dispatch({ type: 'spotifyPlayer/setPlayerError', payload: {
					error: lyricsJson.error
				}});
				return
			}

			await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
				method: 'put',
				body: JSON.stringify({ uris: [track.uri] }),
				headers: new Headers({
					'Authorization': `Bearer ${aToken}`
				})
			});

			dispatch({ type: 'spotifyPlayer/setSongLyrics', payload: {
				lyrics: lyricsJson.data || []
			}});

			dispatch({ type: 'spotifyPlayer/setSongData', payload: {
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				length: Number((track.duration_ms / 1000).toFixed(0))
			}});

			return {
				song,
				lyrics: lyricsJson
			}
	});

	// const getTracksOnScroll = async(evt: React.UIEvent<HTMLTableElement, UIEvent>) => {
	// 	console.log(evt.target.scrollTop)
	// 	if(evt.target.scrollTop !== evt.target.scrollHeight - evt.target.offsetHeight) return;
	// 	setOffset(offset + 20);
	// 	getTracks()
	// }

	const tracklistItems = tracks.data?.items.map((elm) => {
		const track = elm.track;
		const seconds = Math.floor((track.duration_ms / 1000) % 60);
  	const minutes = Math.floor((track.duration_ms / 1000 / 60));
		let fullTime = minutes + ':' + seconds;

		if(seconds < 10) fullTime = minutes + ':0' + seconds;

		return <tr
			className='hover:bg-jungle-300/100'
      key={track.id} 
      onClick={() => { 
				setTrack(track)
      }}
    >
			<th className='flex space-x-2 pl-6 cursor-pointer'>
				<img 
					height='64' 
					width='64' 
					src={track.album?.images[2]?.url} 
					alt={`${track.name} album art`} 
				/>
				<div className='text-left'>
					<p>{track?.name}</p>
					<p className='text-white'>{track.artists[0]?.name}</p>
				</div>
			</th>
			<td>{track.album?.name}</td>
			<td className='pr-6'>{fullTime}</td>
		</tr>
	});

	if(tracks.isLoading || songAndLyrics.isLoading) return <LoadingSpinner isLoading={tracks.isLoading}/>;

  return <>
		<table 
			className='text-lightText w-full'
		>
			<thead className='bg-jungle-400/80 backdrop-blur-lg sticky top-0 h-12'>
				<tr className='text-left text-xl p-2'>
					<th className='pl-6'>Song & Artist</th>
					<th>Album</th>
					<th className='pr-6'>Length</th>
				</tr>
			</thead>
			<tbody>
				{ tracklistItems }
			</tbody>
		</table>
	</>
};

export default Tracklist;