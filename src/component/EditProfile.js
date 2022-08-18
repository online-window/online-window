import React, { useContext,useRef,useState } from 'react'
import ContextMain from '../context/ContextMain'
import {Grid,TextField,Button} from "@material-ui/core"
import { postRequestFile, putRequest } from '../api/server'
export default function EditProfile() {
    const context=useContext(ContextMain)
    const [getName,setName]=useState(context.getUser.name)
    const imageRef=useRef()
    const updateImage=async(file)=>{
        try{
            let formdata=new FormData()
            formdata.append("picture",file.currentTarget.files[0]);
            context.setLoading(true)
            let res=await postRequestFile("user/profile",formdata);
            context.setLoading(false)
            if(res.status){
                context.Alert("Profile Name Update SuccessFully","success")
                context.getUserData()
            }
            else{
                context.Alert(res.error,"warning")
            }
        }
        catch(e){
            context.Alert("Server Error...")
        }
    }
    const updateName=async()=>{
        try{
            if(getName===""){
                context.Alert("Enter Name","warning")
                return;
            }
            context.setLoading(true)
            let res=await putRequest("user/",{name:getName})
            context.setLoading(false)
            if(res.status){
                context.Alert("Profile Name Update SuccessFully","success")
                context.getUserData()
            }
            else{
                context.Alert(res.error,"warning")
            }
        }
        catch(e){
            context.Alert("Server Error...")
        }
    }
  return (
    <div style={{width:"400px",height:"100%"}}>
        <Grid containor>
                <Grid item xs={12} style={{margin:10}}>
                        <TextField fullWidth value={getName} variant='standard' onChange={(e)=>{setName(e.currentTarget.value)}} label="Name" />
                </Grid>
                <Grid item xs={12} style={{margin:10}}>
                        <Button style={{margin:10}}  onClick={()=>{imageRef.current.click()}} variant="outlined" color="primary">Update Profile Pic </Button>
                        <input onChange={updateImage} ref={imageRef} type="file" accept='.jpg,.png' style={{display:"none"}}/>
                        <Button  style={{margin:10}} onClick={updateName} variant="outlined" color="primary">Update Name</Button>
                </Grid>
                {/* <Grid item xs={5} style={{margin:10}}>
                </Grid> */}

        </Grid>
    </div>
  )
}
