import React, { useEffect } from 'react'
import PlayBtn from './playBtn';

const PlayerBar: React.FC = () => {

  return <div className='bg-black bottom-0 absolute w-full h-32 flex justify-center align-center'>
    <PlayBtn/>
  </div>;
};

export default PlayerBar;