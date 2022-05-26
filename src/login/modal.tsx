import React, { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit';
import FullScreenModal from '../modals/fullscreenModal';

const LoginModal: React.FC = () => {

	return <FullScreenModal>
	  <div className='bg-raisinBlack box-border w-max h-96 p-10 mx-4 flex flex-col justify-start drop-shadow-lg'>
	      <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-yellowCrayola to-orangePantone'>Welcome to Lyrical Mayhem</h1>
	      <p className='text-languidLavender mt-3 w-4/6'>To use this application you need to log into your Spotify account and get an access token.</p>
	      <a 
					href="http://localhost:8888/auth" 
					className='link-button self-center mt-auto text-raisinBlack'
				>
					Log in with Spotify
				</a>
	  </div>
	</FullScreenModal>
}

export default LoginModal;