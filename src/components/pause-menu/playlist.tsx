import React, { ReactNode, useEffect, useState } from 'react'
import { GenericObject } from '../../types';
import { useMenuContext } from './context';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

const PlayList: React.FC = () => {
	const context = useMenuContext();
	const [currentPlaylistId, setCurrentPlaylistId] = useState('');
	const aToken = useSelector((state: RootState) => state.auth.accessToken);

	const renderCurrentPlaylist = (): ReactNode | null => {
		const index = context.playlists.findIndex((playlist: GenericObject) => {
			return currentPlaylistId === playlist.id
		});

		if(index === -1) return null;

		const playlist = context.playlists[index];

		return <>
			<button onClick={() => { setCurrentPlaylistId('') }}>
				<img className='text-lightText' src='./arrow-narrow-left.svg' alt="Return to playlist selection" width="24" height="24"/>
			</button>
			<img className='m-auto rounded-sm h-full' height='250' width='250' src={playlist.images[0].url} alt={`${playlist.name} image`} />
			<h2 className='text-lightText w-full text-center self-center'>
				{playlist.name}
			</h2>
		</>
	}

	const getPlaylists = async() => {
		const playlists = await fetch('https://api.spotify.com/v1/me/playlists', {
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});
		const playlistJson = await playlists.json();
		context.setPlaylists(playlistJson.items)
	}

	const getTracks = async(url: string) => {
		const playlists = await fetch(url, {
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});
		const tracksJson = await playlists.json();
		context.setTrackList(tracksJson.items)
	}

	useEffect(() => {
		getPlaylists()
	}, [])

	const playlistsItems = context.playlists?.map((playlist: GenericObject) => {
		return <li key={playlist.id} className='flex justify-start break-all' onClick={() => { 
			setCurrentPlaylistId(playlist.id);
			getTracks(playlist.tracks.href) 
		}}>
			<h2 className='text-lightText'>
				{playlist.name}
			</h2>
		</li>
	});

  return <ul className='py-4 h-96 overflow-y-auto space-y-2 flex flex-col justify-start'>
		{ currentPlaylistId ? renderCurrentPlaylist() : playlistsItems }
	</ul>
};

export default PlayList;