import React, { ReactNode, FC } from 'react'

type FullScreenModalProps = {
	children: ReactNode,
  classes: string
}

const FullScreenModal: FC<FullScreenModalProps> = ({children, classes}) => {

  const [open, setOpen] = React.useState(false); 

  return <div 
    className={`bg-gray w-full absolute ${classes}`}
    onClick={() => { setOpen(false) }}
   >
    {children}
  </div>
};

export default FullScreenModal;