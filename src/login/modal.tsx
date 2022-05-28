import React, { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit';
import FullScreenModal from '../modals/fullscreenModal';

const LoginModal: React.FC = () => {

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
					href="http://localhost:8888/auth" 
					className='link-button self-center mt-auto text-darkBlack'
				>
					Log in with Spotify
				</a>
	  </div>
	</FullScreenModal>
}

export default LoginModal;