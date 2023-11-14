import React, { useContext } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ContextMain from '../context/ContextMain';
export default function DialogBox() {
    const context=useContext(ContextMain)
  return (
    <div style={{width:"100%"}} onMouseDown={(e)=>{e.stopPropagation();}}>

    <Dialog style={{zIndex:100}}  onClose={()=>{context.setOpen(false)}} open={context.open}>
        <DialogTitle>
            {context.getDialog.title}
        </DialogTitle>
        {context.getDialog.component}
    </Dialog>
    </div>
  )
}
