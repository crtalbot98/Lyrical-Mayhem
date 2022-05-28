import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import PlayerBar from './playerBar';
import Game from "../game/main";

const Scene: React.FC = () => {
  const game = useRef(null);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

	useEffect(() => {
		if(loggedIn) {
			game.current = new Game();
			game.current.init()
		} 
	}, [loggedIn])
  
  return <div>
		<PlayerBar/>
  </div>;
};

export default Scene;