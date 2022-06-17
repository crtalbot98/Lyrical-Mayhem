import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import WebPlayer from './web-player/webPlayer';
import Game from "../game/main";
import { RootState } from '../stores/store';
import Menu from './pause-menu/menu';

const Scene: React.FC = () => {
  const game = useRef(null);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
	const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);

	useEffect(() => {
		if(!loggedIn) return;

		game.current = new Game();
		game.current.init()
	}, []);
  
  return <>
		<WebPlayer/>
		{
			!playing ? 
				<Menu>
					<h2 className='text-lightText'>Your Playlists</h2>
					<Menu.PlayList/>
					<Menu.TrackList/>
				</Menu> 
			: null
		}
  </>;
};

export default Scene;