import { Button, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import CreateNewFolderRoundedIcon from '@material-ui/icons/CreateNewFolderRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import ContextMain from '../context/ContextMain'
import '../css/newfolder.css'

export default function NewFolder() {
    const context = useContext(ContextMain);
    let x=new Date().toISOString();
    const [folderName,setFolderName]=useState(`new folder(${(x).substring(x.length-5,x.length)})`)
    
    const handleCreate = () => {
        if(folderName.trim()) {
            context.setOpen(false);
            context.newFolderCreate(folderName);
        }
    }
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleCreate();
        } else if(e.key === 'Escape') {
            context.setOpen(false);
        }
    }
    
    return (
        <div className="newfolder-container">
            {/* <div className="newfolder-header">
                <div className="newfolder-icon">
                    <CreateNewFolderRoundedIcon />
                </div>
            </div> */}
            
            <div className="newfolder-content">
                <TextField 
                    fullWidth 
                    value={folderName} 
                    variant='outlined' 
                    onChange={(e)=>{setFolderName(e.currentTarget.value)}} 
                    onKeyPress={handleKeyPress}
                    label="Folder Name" 
                    autoFocus
                    className="newfolder-input"
                    InputProps={{
                        className: 'newfolder-textfield'
                    }}
                    InputLabelProps={{
                        className: 'newfolder-label'
                    }}
                />
            </div>
            
            <div className="newfolder-actions">
                {/* <Button 
                    onClick={()=>{context.setOpen(false)}} 
                    className="newfolder-btn newfolder-btn-cancel"
                    startIcon={<CloseRoundedIcon />}
                >
                    Cancel
                </Button> */}
                <Button  
                    onClick={handleCreate}
                    className="newfolder-btn newfolder-btn-create"
                    startIcon={<CheckRoundedIcon />}
                    disabled={!folderName.trim()}
                >
                    Create Folder
                </Button>
            </div>
        </div>
    )
}
