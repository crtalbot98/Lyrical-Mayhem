import React, { useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import FullScreenModal from '../modals/fullscreenModal';
import TrackList from './tracklist';

const PlayList: React.FC = () => {

	const [playlists, setPlaylists] = useState([]);
	const [trackListHref, setTrackListHref]= useState('');
	const aToken = useSelector((state: RootState) => state.auth.accessToken);

	const getUserPlaylists = async(): Promise<void> => {
		if(!aToken) return;

		const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
			method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`,
      })
		});
		const playlistsJson = await userPlaylists.json();
		setPlaylists(playlistsJson.items)
	};

	useEffect(() => {
		getUserPlaylists()
	}, [aToken]);

	const playlistsItems = playlists.map((playlist) => {
		return <li key={playlist.id} onClick={() => { setTrackListHref(playlist.tracks.href) }}>
			<h1 className='text-lightText'>{playlist.name}</h1>
		</li>
	});

  return <FullScreenModal classes={'flex flex-col lg:flex-row justify-start p-10 space-y-12'}>
		<ul className='overflow-y-auto'>
			{playlistsItems}
		</ul>
		<TrackList currentTrackListHref={trackListHref}/>
	</FullScreenModal>
};

export default PlayList;