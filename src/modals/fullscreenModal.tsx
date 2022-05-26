import React, { ReactNode, FC } from 'react'
import { store } from '../stores/store'

type FullScreenModalProps = {
	children: ReactNode
}

const FullScreenModal: FC<FullScreenModalProps> = ({children}) => {

  const [open, setOpen] = React.useState(false); 

  return <div className='bg-languidLavender w-full h-full absolute flex justify-center items-center'>
    {children}
  </div>
};

export default FullScreenModal;