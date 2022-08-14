import React, { useState, memo } from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import { PlayList } from './playlist';
import Tracklist from './tracklist';
import { createContext, useContext } from 'react';

export type MenuContextType = {
  playlists: any[], 
	setPlaylists: React.Dispatch<React.SetStateAction<any[]>>,
	selectedPlaylistId: string,
	setSelectedPlaylistId: React.Dispatch<React.SetStateAction<string>>
}

export const MenuContext = createContext<MenuContextType>({
	playlists: [],
	setPlaylists: () => {},
	selectedPlaylistId: '',
	setSelectedPlaylistId: () => {}
});

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if(!context) throw new Error('Warning! Extracting context without wrapping your component.');
  return context
}

export interface CompoundedMenu extends React.FC{
	PlayList: typeof PlayList,
	TrackList: typeof Tracklist
}

const Menu: CompoundedMenu = ({children}) => {
	const [playlists, setPlaylists] = useState([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

	return <MenuContext.Provider 
		value={{ playlists, setPlaylists, selectedPlaylistId, setSelectedPlaylistId } as MenuContextType}
	>
		<FullScreenModal classes={'bg-lightGray grid grid-cols-1 auto-rows-min justify-start p-6 h-7/8'}>
			<h1 className='text-orange'>Lyrical Mayhem</h1>
			{children}
		</FullScreenModal>
	</MenuContext.Provider>
};

Menu.PlayList = memo(PlayList);
Menu.TrackList = memo(Tracklist);

export default Menu;