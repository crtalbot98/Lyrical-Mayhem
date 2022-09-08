import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../loadingSpinner';
import SelectedPlayList from './selectedPlaylist';

export const getPlaylistById = (playlists: SpotifyApi.PlaylistObjectFull[], id: string): SpotifyApi.PlaylistObjectFull => {
	if(!id) return null;
	const index = playlists.findIndex((playlist) => id === playlist.id);
	if(index === -1) return null;
	return playlists[index];
}

export const Playlist: React.FC<{ selectedPlaylist: { trackListUrl: string; id: string; }, selectPlaylist: Dispatch<SetStateAction<{ trackListUrl: string; id: string; }>> }> = ({ selectedPlaylist, selectPlaylist }) => {
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
	const { data, error, isError, isLoading } = useQuery<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>, Error>(
		['playlists'], 
		async() => {
			const res = await fetch('https://api.spotify.com/v1/me/playlists', {
				headers: new Headers({
					'Authorization': `Bearer ${aToken}`
				})
			});

			if(!res.ok) throw new Error('Something happened with the Spotify Api!');
			return res.json()
	});
	const selectedPlaylistData = getPlaylistById(data?.items, selectedPlaylist.id);

	const playlistsItems = data?.items.map((playlist) => {
		return <li 
			key={playlist.id} 
			className='flex justify-start break-all text-3xl text-lightText cursor-pointer decoration-orange hover:underline' 
			onClick={() => selectPlaylist({ id: playlist.id, trackListUrl: playlist.tracks.href }) }
		>
			{playlist.name}
		</li>
	});

	if(isError) return <p>{ 'Something went wrong.' + error }</p>
	if(isLoading) return <LoadingSpinner isLoading={isLoading}/>

  return <div className='lg:max-w-4xl flex flex-col justify-between h-full'>
		<ul className={'overflow-y-auto space-y-2 flex flex-col justify-start'}>
			{ playlistsItems }
		</ul>
		{ selectedPlaylist.id &&
			<SelectedPlayList 
				playlist={selectedPlaylistData} 
				reset={() => { selectPlaylist({ id: '', trackListUrl: '' }) }}
			/>
		}
	</div>
}