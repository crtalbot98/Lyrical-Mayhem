import React, { useMemo, useCallback, useState, useEffect, ReactNode } from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import { fetchSpotifyData } from '../hooks/fetchSpotifyData';
import { useDispatch } from 'react-redux';
import { GenericObject } from '../../types';
import { MenuContext, useMenuContext, MenuContextType } from './context';

interface CompoundedMenu extends React.FC{
	PlayList: typeof PlayList,
	TrackList: typeof TrackList
}
const Menu: CompoundedMenu = ({children}) => {
	const [currentTrackListHref, setCurrentTrackListHref] = useState('');
	const [currentPlaylistName, setCurrentPlaylistName] = useState('');
	const value = {
		currentTrackListHref,
		setCurrentTrackListHref,
		currentPlaylistName,
		setCurrentPlaylistName
	} as MenuContextType;

	return <MenuContext.Provider value={value}>
		<FullScreenModal classes={'flex flex-col lg:flex-row justify-start p-10 space-y-12'}>
			<h1 className='text-lightText'>Your Playlists</h1>
			{children}
		</FullScreenModal>
	</MenuContext.Provider>
};

const PlayList: React.FC = () => {
	const context = useMenuContext();
	const playlists: GenericObject[] = fetchSpotifyData('https://api.spotify.com/v1/me/playlists', []);

	const renderCurrentPlaylist = (): ReactNode => {
		const playlistsIndex = playlists.findIndex((playlist: GenericObject) => {
			return context.currentPlaylistName === playlist.name
		});

		if(playlistsIndex !== -1) {
			const playlist = playlists[0];
			return <>
				<button onClick={() => { 
					context.setCurrentPlaylistName('');
					context.setCurrentTrackListHref(''); 
				}}>
					Return to Playlist Selection
				</button>
				<img height={150} width={150} src={playlist.images[0].url} alt={`${playlist.name} image`} />
				<h2 className='text-lightText bg-lightGray w-full p-3'>
					{playlist.name}
				</h2>
			</>
		}

		return null
	}

	const playlistsItems = playlists?.map((playlist: GenericObject) => {
		return <li 
			key={playlist.id}
			className='flex justify-start break-all'
			onClick={() => {
				context.setCurrentTrackListHref(playlist.tracks.href);
				context.setCurrentPlaylistName(playlist.name)
			}}
		>
			<h2 className='text-lightText'>
				{playlist.name}
			</h2>
		</li>
	});

  return <ul>
		{context?.currentPlaylistName ? renderCurrentPlaylist() : playlistsItems}
	</ul>
};

const TrackList: React.FC = () => {
	const context = useMenuContext();
	const dispatch = useDispatch();
	const trackList: GenericObject[] = fetchSpotifyData(context.currentTrackListHref, [context.currentTrackListHref]);

	const trackListItems = trackList.map((item: GenericObject) => {
		return <li 
      key={item.track.id} 
      onClick={() => { 
        dispatch({ type: 'spotifyPlayer/setCurrentSong', payload: { 
					uri: item.track.uri,
					id:  item.track.id,
					name: item.track.name,
					artist: item.track.artists[0].name
				}}) 
      }}
    >
			<p className='text-white'>{item.track.name} - {item.track.artists[0].name}</p>
		</li>
	});

  return <ul className={`overflow-y-auto h-96`}>
		{context.currentTrackListHref ? trackListItems : null}
	</ul>
};

Menu.PlayList = PlayList;
Menu.TrackList = TrackList;

export default Menu;