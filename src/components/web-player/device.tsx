import React from 'react'
import { usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';

const Device: React.FC = () => {
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();

  if(!playbackState && !device) return <div className='absolute w-full h-full bg-black flex justify-center items-center'>
    <p>Loading...</p>
  </div>
};

export default Device;