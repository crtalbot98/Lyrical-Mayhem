import React from 'react'
import { fetchSpotifyData } from '../fetchSpotifyData';

const PlayList: React.FC = () => {
	const playlists = fetchSpotifyData('https://api.spotify.com/v1/me/playlists', [])

	const playlistsItems = playlists?.map((playlist: any) => {
		return <li key={playlist.id}>
			<h1 className='text-lightText'>
				{playlist.name}
			</h1>
		</li>
	});
  return <ul className='overflow-y-auto'>
		{playlistsItems}
	</ul>
};

export default PlayList;