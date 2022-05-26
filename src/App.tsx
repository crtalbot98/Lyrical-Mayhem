import React, { useEffect, useRef } from 'react'
import Game from "./game/main";
import PlayerBar from './spotify-player/player';
import LoginModal from './login/modal';
import './styles/main.css';

const App: React.FC = () => {

  const game = useRef(null);

  useEffect(() => {
    game.current = new Game();
    game.current.init();
  }, [])

  return <div className="m-0 p-0">
    <LoginModal/>
    {/* <PlayerBar/> */}
  </div>;
};

export default App;