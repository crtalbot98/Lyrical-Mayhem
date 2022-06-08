import React, { ReactNode, FC } from 'react'
import { store } from '../../stores/store'

type FullScreenModalProps = {
	children: ReactNode,
  classes: string
}

const FullScreenModal: FC<FullScreenModalProps> = ({children, classes}) => {

  const [open, setOpen] = React.useState(false); 

  return <div 
          className={`bg-gray w-full h-full absolute ${classes}`}
          onClick={() => { setOpen(false) }}
         >
    {children}
  </div>
};

export default FullScreenModal;