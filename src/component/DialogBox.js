import React, { useContext } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ContextMain from '../context/ContextMain';
export default function DialogBox() {
    const context=useContext(ContextMain)
    console.log(context.open)
  return (
    <div style={{width:"100%"}}>

    <Dialog  onClose={()=>{context.setOpen(false)}} open={context.open}>
        <DialogTitle>
            {context.getDialog.title}
        </DialogTitle>
        {context.getDialog.component}
    </Dialog>
    </div>
  )
}
