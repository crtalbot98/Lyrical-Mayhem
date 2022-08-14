import React from "react";

const LoadingSpinner: React.FC<{isLoading: boolean}> = ({ isLoading }) => {

  if(!isLoading) return null;

  return <div className='rounded-full border-4 border-b-orange bg-black h-20 w-20 animate-spin z-50 self-center absolute'>
  </div>;
};

export default LoadingSpinner