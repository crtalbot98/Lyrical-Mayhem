import { createContext, useContext } from 'react';

export type MenuContextType = {
	trackList: any[], 
	setTrackList: React.Dispatch<React.SetStateAction<any[]>>,
  playlists: any[], 
	setPlaylists: React.Dispatch<React.SetStateAction<any[]>>
}

export const MenuContext = createContext<MenuContextType>({
  trackList: [], 
	setTrackList: () => {},
	playlists: [],
	setPlaylists: () => {}
});

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if(!context) throw new Error('Warning! Extracting context without wrapping your component.');
  return context
}
