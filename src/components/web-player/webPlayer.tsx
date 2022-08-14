import React from 'react'
import PlayBtn from './playButton';
import Progress from './playerTimestamp';
import { usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';
import LoadingSpinner from '../loadingSpinner';

const player: React.FC = () => {
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();

  return <div className='bg-black bottom-0 absolute w-full h-1/8 flex justify-center align-center z-50'>
    <LoadingSpinner isLoading={!playbackState && !device} />
    <PlayBtn/>
    <Progress/>
  </div>;
};

export default player;