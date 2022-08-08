import React, { useState, memo } from 'react'
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

	return <MenuContext.Provider 
		value={{ trackList, setTrackList, playlists, setPlaylists } as MenuContextType}
	>
		<FullScreenModal classes={'bg-lightGray flex flex-col 2xl:flex-row justify-start p-10'}>
			<h1 className='text-orange'>Lyrical Mayhem</h1>
			{children}
		</FullScreenModal>
	</MenuContext.Provider>
};

Menu.PlayList = memo(Playlist);
Menu.TrackList = memo(Tracklist);

export default Menu;