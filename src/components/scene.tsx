import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux';
import WebPlayer from './web-player/webPlayer';
import { Game } from "../game/main";
import { RootState } from '../stores/store';
import Menu from './pause-menu/menu';
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

const Scene: React.FC = () => {
  const game = useRef(null);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
	const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);
	const aToken: string = useSelector((state: RootState) => state.auth.accessToken);

	useEffect(() => {
		if(!loggedIn) return;

		game.current = new Game();
		game.current.init()
	}, []);
  
  return <>
		<WebPlaybackSDK
      initialDeviceName="Lyrical Mayhem Web Player"
      getOAuthToken={useCallback((callback: any): void => callback(aToken), [])}
      initialVolume={0.5}
      connectOnInitialized={true}
    >
      <WebPlayer/>
			{
			!playing ? 
				<Menu>
					<Menu.PlayList/>
					<Menu.TrackList/>
				</Menu> 
			: null
		}
    </WebPlaybackSDK>
  </>;
};

export default Scene;