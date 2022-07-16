import React from 'react'
import PlayBtn from './playButton';
import Progress from './playerTimestamp';
import Device from './device';

const player: React.FC = () => {
  return <div className='bg-black bottom-0 absolute w-full h-32 flex justify-center align-center z-50'>
    <PlayBtn/>
    <Progress/>
    <Device/>
  </div>;
};

export default player;