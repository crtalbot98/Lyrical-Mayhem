import React, { useEffect } from 'react'
import LoginModal from './login/modal';
import './styles/main.css';
import { useSelector, useDispatch } from 'react-redux';
import Scene from './spotify-player/scene';


const App: React.FC = () => {

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    dispatch({ type: 'auth/setLoggedIn' });
  }, []);

  return <div className="m-0 p-0">
    { loggedIn ? <Scene/> : <LoginModal/> }
  </div>
};

export default App;