import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ContextMain from '../context/ContextMain';
import '../css/dialogbox.css';

export default function DialogBox() {
    const context = useContext(ContextMain)
    
    return (
        <div className="dialogbox-wrapper" onMouseDown={(e)=>{e.stopPropagation();}}>
            <Dialog 
                open={context.open}
                onClose={()=>{context.setOpen(false)}}
                maxWidth={false}
                classes={{
                    paper: 'dialogbox-paper'
                }}
                BackdropProps={{
                    className: 'dialogbox-backdrop'
                }}
            >
                <div className="dialogbox-container">
                    {context.getDialog.title && (
                        <div className="dialogbox-header">
                            <h2 className="dialogbox-title">{context.getDialog.title}</h2>
                            <IconButton 
                                className="dialogbox-close-btn"
                                onClick={()=>{context.setOpen(false)}}
                                aria-label="close"
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        </div>
                    )}
                    
                    <div className="dialogbox-content">
                        {context.getDialog.component}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
