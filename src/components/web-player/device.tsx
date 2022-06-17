import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { usePlayerDevice, useWebPlaybackSDKReady, usePlaybackState } from 'react-spotify-web-playback-sdk';

const Device: React.FC = () => {
  const dispatch = useDispatch();
  const device = usePlayerDevice();
  const playerReady = useWebPlaybackSDKReady();
  const playbackState = usePlaybackState();

  useEffect(() => {
    if(!playbackState && !device) return;
    dispatch({ type: 'spotifyPlayer/setDeviceId', payload: { deviceId: device.device_id } })
  }, [device])

  return <>
    { !playbackState && !device ? <div className='absolute w-full h-full bg-black flex justify-center items-center'>
      <p>Loading...</p>
    </div> : null }
  </>;
};

export default Device;