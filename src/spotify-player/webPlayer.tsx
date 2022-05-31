import React, { useEffect, useCallback } from 'react'
import PlayBtn from './playBtn';
import { WebPlaybackSDK, WebPlaybackSDKProps } from "react-spotify-web-playback-sdk";
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

const PlayerBar: React.FC = () => {

  const aToken: string = useSelector((state: RootState) => state.auth.accessToken);

  return <div className='bg-black bottom-0 absolute w-full h-32 flex justify-center align-center'>
    <WebPlaybackSDK
      initialDeviceName="Lyrical Mayhem Web Player"
      getOAuthToken={useCallback((callback: any): void => callback(aToken), [])}
      initialVolume={0.5}
    />
    <PlayBtn/>
  </div>;
};

export default PlayerBar;