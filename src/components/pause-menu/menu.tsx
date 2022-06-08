import React from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import PlayList from './playlist';

const Menu: React.FC = () => {

  return <FullScreenModal classes={'flex flex-col lg:flex-row justify-start p-10 space-y-12'}>
		<PlayList/>
	</FullScreenModal>
};

export default Menu;