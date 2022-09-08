import React, { useState } from 'react'
import FullScreenModal from '../modals/fullscreenModal';
import { Playlist } from './playlist';
import Tracklist from './tracklist';
import Sidebar from './sidebar';

const Menu: React.FC = () => {
	const [selectedData, setSelectedData] = useState({
		trackListUrl: '',
		id: ''
	});

	return <FullScreenModal 
			classes={'bg-jungle-300/60 backdrop-blur-sm inline-grid grid-cols[auto auto] h-7/8'}
		>
		<Sidebar>
			<h1 className='text-orange'>Lyrical Mayhem</h1>
			<Playlist selectedPlaylist={selectedData} selectPlaylist={setSelectedData}/>
		</Sidebar>
		<div className='col-start-1 col-span-2 lg:col-start-2 lg:max-w-7xl overflow-y-auto h-full pb-6'>
			<Tracklist selectedPlaylist={selectedData}/>
		</div>
	</FullScreenModal>
};

export default Menu;