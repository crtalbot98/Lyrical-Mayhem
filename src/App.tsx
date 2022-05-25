import '../src/styles/style.css';
import React, { useEffect } from 'react'
import Game from "./game/main";

const game = new Game();

const App: React.FC = () => {

  useEffect(() => {
    game.init();
  }, [])

  return <div className="bg-gray-400">
  </div>;
};

export default App;