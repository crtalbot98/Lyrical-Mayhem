import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

const PlayList: React.FC = () => {

	const [playLists, setPlaylists] = useState([]);
	const aToken = useSelector((state: RootState) => state.auth.accessToken);

	const getUserPlaylists = async() => {
		const userPlayLists = await fetch(`https://api.spotify.com/v1/me/playlists`, {
			method: 'get',
      headers: new Headers({
          'Authorization': `Bearer ${aToken}`,
					'Origin': 'http://localhost:8080'
      })
		});
		console.log(userPlayLists);
		// setPlaylists(userPlayLists)
	};

	useEffect(() => {
		getUserPlaylists()
	}, []);

  return <div className=''>
    
  </div>;
};

export default PlayList;