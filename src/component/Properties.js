import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import { Grid ,TextField} from '@material-ui/core'
import { SERVER_URL } from '../api/server';
export default function Properties() {
    const context=useContext(ContextMain)
    let {folder_name,folder_add_date,folder_extention,folder_logo,space}=context.getClickFolder;
    let path=(context.getCurrentDir.map((item)=>item.folder_name)).join("/")+`/${folder_name}`
    return (
    <div style={{width:"500px",height:"auto"}}>
        <Grid containor>
            <Grid item xs={12} style={{margin:10}}>
                <TextField variant='standard' disabled fullWidth label="Folder Name" value={folder_name} />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField variant='standard' disabled fullWidth label="Path" value={path} />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField variant='standard' disabled fullWidth label="Space Used" value={Math.round((parseFloat(space)*100)/100)} />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField variant='standard' disabled fullWidth label="Extention" value={folder_extention} />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField variant='standard' disabled fullWidth label="Date Of Create" value={folder_add_date} />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
               <img src={folder_logo!==""?String(folder_logo).includes("/")?folder_logo:`${SERVER_URL}/folder_logo/${folder_logo}`:"/folderLogo.png"} alt="Folder Logo" />
            </Grid>
        </Grid>
    </div>
  )
}
