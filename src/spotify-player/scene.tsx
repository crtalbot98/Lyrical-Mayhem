import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import PlayerBar from './player';
import Game from "../game/main";
import { RootState } from '../stores/store';
import PlayList from './playlist';

const Scene: React.FC = () => {
  const game = useRef(null);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

	useEffect(() => {
		if(loggedIn) {
			game.current = new Game();
			game.current.init()
		} 
	}, [loggedIn])
  
  return <>
		<PlayerBar/>
		<PlayList/>
  </>;
};

export default Scene;