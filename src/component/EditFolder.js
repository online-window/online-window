import { Button, Grid, TextField } from '@material-ui/core'
import React,{useContext, useState} from 'react'
import { putRequest } from '../api/server'
import ContextMain from '../context/ContextMain'

export default function EditFolder(props) {
    console.log(props.folder_type)
    if(props.folder_type===0){
        let name=String(props.folder_name)
        let last=name.lastIndexOf(".")
        var folder_name=name.substring(0,last)
        var folder_extention=name.substring(last)
    }
    else{
        var folder_name=String(props.folder_name)
        var folder_extention=""
    }
    // console.log(folder_name,folder_extention)
    const [getName,setName]=useState(folder_name)
    const [getLogo,setLogo]=useState(props.folder_logo)
    const context=useContext(ContextMain)
    const handleClick=async()=>{
        try{
        var body={}
        if(getName!==""){
                body['folder_name'] =`${getName}${folder_extention}`;
        }
        body['folder_logo']=getLogo;
        if(Object.keys(body).length!==0){
            context.setLoading(true)
            let res=await putRequest(`folder/${props._id}`,body);
            context.setLoading(false)
            if(res.status){
                context.setOpen(false)
                context.Alert("Folder Edit SuccessFully","success")
                context.fetchFolders()
            }
            else{
                context.Alert(res.error,"warning")
            }
        }

    }
    catch(e){
        console.log(e)
        context.Alert("Server Error...")
    }
    }
  return (
    <div style={{width:"400px",padding:30}}>
        <Grid containor >
            <Grid item xs={12} style={{margin:10}}>
                    <TextField value={getName} onChange={(e)=>{setName(e.currentTarget.value)}} fullWidth variant='standard' label="Folder Name"/>
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                    <TextField value={getLogo} onChange={(e)=>{setLogo(e.currentTarget.value)}} fullWidth variant='standard' label="Folder Logo"/>
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                    <Button onClick={handleClick} fullWidth variant="outlined" color="secondary">Edit Folder</Button>
            </Grid>
        </Grid>
    </div>
  )
}
