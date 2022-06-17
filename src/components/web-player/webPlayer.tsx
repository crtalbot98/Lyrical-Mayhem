import React, { useCallback } from 'react'
import PlayBtn from './playButton';
import Progress from './progress';
import Device from './device';
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

const player: React.FC = () => {
  const aToken: string = useSelector((state: RootState) => state.auth.accessToken);

  return <div className='bg-black bottom-0 absolute w-full h-32 flex justify-center align-center z-50'>
    <WebPlaybackSDK
      initialDeviceName="Lyrical Mayhem Web Player"
      getOAuthToken={useCallback((callback: any): void => callback(aToken), [])}
      initialVolume={0.5}
      connectOnInitialized={true}
    >
      <PlayBtn/>
      <Progress/>
      <Device/>
    </WebPlaybackSDK>
  </div>;
};

export default player;