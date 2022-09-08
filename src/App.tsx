import React, { useEffect } from 'react'
import LoginModal from './components/login/modal';
import './styles/main.css';
import { useSelector, useDispatch } from 'react-redux';
import Scene from './components/scene';
import { RootState } from './stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'auth/setLoggedIn' });
  }, []);

  if(!loggedIn) return <LoginModal/>
  return <QueryClientProvider client={queryClient}>
    <Scene/>
  </QueryClientProvider>
};

export default App;