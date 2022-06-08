import { createContext, useContext } from 'react';

export type MenuContextType = {
	currentTrackListHref: string, 
	setCurrentTrackListHref: React.Dispatch<React.SetStateAction<string>>,
  currentPlaylistName: string, 
	setCurrentPlaylistName: React.Dispatch<React.SetStateAction<string>>
}

export const MenuContext = createContext<MenuContextType>({
  currentTrackListHref: '', 
	setCurrentTrackListHref: () => {},
	currentPlaylistName: '',
	setCurrentPlaylistName: () => {}
});

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if(!context) throw new Error('Warning! Extracting context without wrapping your component.');
  return context
}
