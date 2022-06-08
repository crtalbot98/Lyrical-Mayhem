import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { GenericObject } from '../../types';

export const fetchSpotifyData = (url: string, dependencies: string[] | GenericObject[]) => {
  const aToken = useSelector((state: RootState) => state.auth.accessToken);
  const [data, setData] = useState([]);

  const GetSpotifyData = async(): Promise<void> => {
		if(!aToken || !url) return;

		const data = await fetch(url, {
			method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${aToken}`
      })
		});
		const jsonFromData = await data.json();
		setData(jsonFromData.items)
	};

	useEffect(() => {
		GetSpotifyData()
	}, [aToken, ...dependencies]);

  return data
}