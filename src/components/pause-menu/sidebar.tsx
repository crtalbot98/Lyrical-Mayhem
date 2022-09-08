import React from "react";

const Sidebar: React.FC = ({ children }) => {

  return <div 
    className='bg-jungle-400 h-80 col-span-2 lg:col-span-1 lg:h-full p-6 lg:max-w-lg sticky top-0 flex flex-col justify-between'
  >
    { children }
  </div>
}

export default Sidebar