import React, { useEffect } from 'react'
import { GenericObject } from '../../types';
import { useMenuContext } from './menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

export const getPlaylistById = (playlists: any[], id: string): any => {
	if(!id) return null;

	const index = playlists.findIndex((playlist: GenericObject) => {
		return id === playlist.id
	});

	if(index === -1) return null;
	return playlists[index];
}

export const PlayList: React.FC = () => {
	const context = useMenuContext();
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const selectedPlaylist = getPlaylistById(context.playlists, context.selectedPlaylistId);

	const getPlaylists = async() => {
		const playlists = await fetch('https://api.spotify.com/v1/me/playlists', {
			headers: new Headers({
				'Authorization': `Bearer ${aToken}`
			})
		});
		const playlistJson = await playlists.json();
		context.setPlaylists(playlistJson.items)
	}

	useEffect(() => {
		getPlaylists()
	}, [])

	const playlistsItems = context.playlists.map((playlist: GenericObject) => {
		return <li key={playlist.id} className='flex justify-start break-all' onClick={() => { 
			context.setSelectedPlaylistId(playlist.id) 
		}}>
			<h2 className='text-lightText'>
				{playlist.name}
			</h2>
		</li>
	});

	if(selectedPlaylist)  {
		return <div className={'py-4 h-96 flex flex-col justify-between animate-slideIn'}>
			<button onClick={() => { context.setSelectedPlaylistId('') }}>
				<img className='text-lightText' src='./arrow-narrow-left.svg' alt="Return to playlist selection" width="24" height="24"/>
			</button>
			<img className='mx-auto rounded-sm max-h-48 shadow-lg' src={selectedPlaylist.images[0].url} alt={`${selectedPlaylist.name} image`} />
			<h2 className='text-lightText w-full text-center self-center'>
				{selectedPlaylist.name}
			</h2>
		</div>
	}

  return <ul className={'py-4 max-h-96 overflow-y-auto space-y-2 flex flex-col justify-start overflow-y-auto animate-slideIn'}>
		{ playlistsItems }
	</ul>
}