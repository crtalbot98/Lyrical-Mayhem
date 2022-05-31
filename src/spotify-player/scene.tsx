import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import WebPlayer from './webPlayer';
import Game from "../game/main";
import { RootState } from '../stores/store';
import PlayList from './playlist';

const Scene: React.FC = () => {
  const game = useRef(null);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
	const playing = useSelector((state: RootState) => state.spotifyPlayer.playing);

	useEffect(() => {
		if(!loggedIn) return;

		game.current = new Game();
		game.current.init()
	}, [loggedIn]);
  
  return <>
		<WebPlayer/>
		{!playing ? <PlayList/> : null}
  </>;
};

export default Scene;