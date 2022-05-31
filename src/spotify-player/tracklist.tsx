import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';

type TrackListProps = {
  currentTrackListHref: string
}

const TrackList: React.FC<TrackListProps> = ({currentTrackListHref}) => {

	const [trackLists, setTrackLists]= useState([]);
	const aToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

	const getPlaylistTracks = async(href: string) => {
		const playlistTracks = await fetch(href, {
			method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`,
      })
		});
		const tracksJson = await playlistTracks.json();
		setTrackLists(tracksJson.items);
	}

  useEffect(() => {
    getPlaylistTracks(currentTrackListHref)
  }, [currentTrackListHref]);

	const trackListItems = trackLists.map((item) => {
		return <li 
      key={item.track.id} 
      onClick={() => { 
        dispatch({ type: 'spotifyPlayer/setCurrentSong', payload: { newSong: item.track.uri } }) 
      }}
    >
			<p className='text-white'>{item.track.name} - {item.track.artists[0].name}</p>
		</li>
	});

  return <ul className='overflow-y-auto h-96'>
			{trackListItems}
		</ul>
};

export default TrackList;