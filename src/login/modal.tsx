import React, { useEffect } from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/stores/store';

const LoginModal: React.FC = () => {
	
	const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    dispatch({ type: 'auth/setLoggedIn' });
  }, []);

	return <FullScreenModal>
	  <div className='bg-lightGray modal'>
	      <h1 
		  		className='text-orange'
				>
					Welcome to Lyrical Mayhem
				</h1>
	      <p 
					className='text-white w-5/6'
				>
					To use this application you need to log into your Spotify account and get an access token.
				</p>
	      <a 
					href="http://localhost:8888/auth/getUserCode" 
					className='link-button self-center mt-auto text-darkBlack'
				>
					Log in with Spotify
				</a>
	  </div>
	</FullScreenModal>
}

export default LoginModal;