import React, { ReactNode, FC } from 'react'
import { store } from '../stores/store'

type FullScreenModalProps = {
	children: ReactNode
}

const FullScreenModal: FC<FullScreenModalProps> = ({children}) => {

  const [open, setOpen] = React.useState(false); 

  return <div 
          className='bg-gray w-full h-full absolute flex justify-center items-center px-2 md:px-10'
          onClick={() => { setOpen(false) }}
         >
    {children}
  </div>
};

export default FullScreenModal;