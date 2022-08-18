import { TextField } from '@material-ui/core'
import React from 'react'
import "../css/foldermenu.css"
export default function FolderDialog() {
  return (
    <div className='menu' style={{left:"50%",top:"50%"}}>
            <TextField label="Folder Name" variant='outlined'/>
    </div>
  )
}
