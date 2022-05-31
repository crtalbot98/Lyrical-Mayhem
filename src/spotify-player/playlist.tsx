import React, { useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import FullScreenModal from '../modals/fullscreenModal';

const PlayList: React.FC = () => {

	const [playlists, setPlaylists] = useState([]);
	const [trackLists, setTrackLists]= useState([]);
	const aToken = useSelector((state: RootState) => state.auth.accessToken);

	const getUserPlaylists = async(): Promise<void> => {
		if(!aToken) return;

		const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
			method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`,
      })
		});
		const playlistsJson = await userPlaylists.json();
		console.log(playlistsJson)
		setPlaylists(playlistsJson.items)
	};

	const getPlaylistTracks = async(href: string) => {
		console.log(href)
		if(playlists.length < 1) return;

		const playlistTracks = await fetch(href, {
			method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`,
      })
		});
		const tracksJson = await playlistTracks.json();
		console.log(tracksJson)
		setTrackLists(tracksJson.items);
	}

	useEffect(() => {
		getUserPlaylists()
	}, [aToken]);

	const playlistsItems = playlists.map((playlist) => {
		return <li key={playlist.id} onClick={() => { getPlaylistTracks(playlist.tracks.href) }}>
			<h1>{playlist.name}</h1>
			<p>{playlist.description}</p>
		</li>
	});

	const trackListItems = trackLists.map((item) => {
		return <li key={item.track.id} onClick={() => {}}>
			<h2>{item.track.name}</h2>
			<p>{item.track.description}</p>
		</li>
	});

  return <FullScreenModal classes={'flex justify-around p-10'}>
		<ul>
			{playlistsItems}
		</ul>
		<ul>
			{trackListItems}
		</ul>
	</FullScreenModal>
};

export default PlayList;