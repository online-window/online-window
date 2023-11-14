import { Button, TextField ,Grid} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import ContextMain from '../context/ContextMain'

export default function NewFolder() {
    const context = useContext(ContextMain);
    let x=new Date().toISOString();
    const [folderName,setFolderName]=useState(`new folder(${(x).substring(x.length-5,x.length)})`)
  return (
    <div style={{width:"400px",height:"100%"}}>
    <Grid containor>
            <Grid item xs={12} style={{margin:10}}>
                    <TextField fullWidth value={folderName} variant='outlined' onChange={(e)=>{setFolderName(e.currentTarget.value)}} label="Folder Name" />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                    <Button style={{margin:10}}  onClick={()=>{context.setOpen(false)}} variant="outlined" color="primary">Cancel</Button>
                    <Button  style={{margin:10}} onClick={()=>{context.setOpen(false);context.newFolderCreate(folderName)}} variant="outlined" color="primary">Create Folder</Button>
            </Grid>
    </Grid>
</div>
  )
}
