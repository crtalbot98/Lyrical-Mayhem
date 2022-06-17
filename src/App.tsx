import React from 'react'
import LoginModal from './components/login/modal';
import './styles/main.css';
import { useSelector } from 'react-redux';
import Scene from './components/scene';
import { RootState } from './stores/store';

const App: React.FC = () => {

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  return <div className="m-0 p-0">
    { loggedIn ? <Scene/> : <LoginModal/> }
  </div>
};

export default App;