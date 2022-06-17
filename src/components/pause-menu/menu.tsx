import React, { useState } from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import { MenuContext, MenuContextType } from './context';
import Playlist from './playlist';
import Tracklist from './tracklist';

export interface CompoundedMenu extends React.FC{
	PlayList: typeof Playlist,
	TrackList: typeof Tracklist
}

const Menu: CompoundedMenu = ({children}) => {
	const [trackList, setTrackList] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const value = { trackList, setTrackList, playlists, setPlaylists } as MenuContextType;

	return <MenuContext.Provider value={value}>
		<FullScreenModal classes={'bg-lightGray flex flex-col lg:flex-row justify-start p-10'}>
			<h1 className='text-orange'>Lyrical Mayhem</h1>
			{children}
		</FullScreenModal>
	</MenuContext.Provider>
};

Menu.PlayList = Playlist;
Menu.TrackList = Tracklist;

export default Menu;