import React, { useContext,useRef,useState } from 'react'
import ContextMain from '../context/ContextMain'
import {TextField,Button} from "@material-ui/core"
import { postRequestFile, putRequest, SERVER_URL } from '../api/server'
import PersonRounded from '@material-ui/icons/PersonRounded';
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded';
import SaveRounded from '@material-ui/icons/SaveRounded';
import '../css/editprofile.css'

export default function EditProfile() {
    const context=useContext(ContextMain)
    const [getName,setName]=useState(context.getUser.name)
    const [alert,setAlert]=useState({show:false, message:'', type:''})
    const imageRef=useRef()
    
    const showAlert = (message, type) => {
        setAlert({show: true, message, type})
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 3000)
    }
    
    const updateImage=async(file)=>{
        try{
            let formdata=new FormData()
            formdata.append("picture",file.currentTarget.files[0]);
            context.setLoading(true)
            let res=await postRequestFile("user/profile",formdata);
            context.setLoading(false)
            if(res.status){
                showAlert("Profile picture updated successfully","success")
                context.getUserData()
            }
            else{
                showAlert(res.error,"error")
            }
        }
        catch(e){
            showAlert("Server Error...","error")
        }
    }
    
    const updateName=async()=>{
        try{
            if(getName.trim()===""){
                showAlert("Enter Name","error")
                return;
            }
            context.setLoading(true)
            let res=await putRequest("user/",{name:getName})
            context.setLoading(false)
            if(res.status){
                showAlert("Profile name updated successfully","success")
                context.getUserData()
            }
            else{
                showAlert(res.error,"error")
            }
        }
        catch(e){
            showAlert("Server Error...","error")
        }
    }
    
  return (
    <div className='editprofile-container'>
        {alert.show && (
            <div className={`editprofile-alert editprofile-alert-${alert.type}`}>
                <div className='editprofile-alert-content'>
                    {alert.type === 'success' ? '✓' : '✕'} {alert.message}
                </div>
            </div>
        )}
        <div className='editprofile-avatar-section'>
            <div className='editprofile-avatar-wrapper'>
                <img 
                    src={context.getUser.profile_pic ? `${SERVER_URL}/user/profile_pic/?pic=${context.getUser.profile_pic}` : '/default-avatar.png'}
                    alt="Profile"
                    className='editprofile-avatar-image'
                />
                <div className='editprofile-avatar-overlay' onClick={()=>{imageRef.current.click()}}>
                    <PhotoCameraRounded className='editprofile-camera-icon' />
                </div>
            </div>
            <div className='editprofile-avatar-label'>Click to change photo</div>
            <input onChange={updateImage} ref={imageRef} type="file" accept='.jpg,.png,.jpeg' style={{display:"none"}}/>
        </div>

        <div className='editprofile-divider'></div>

        <div className='editprofile-form'>
            <div className='editprofile-field'>
                <TextField 
                    fullWidth 
                    value={getName} 
                    variant='outlined'
                    size='small'
                    onChange={(e)=>{setName(e.currentTarget.value)}} 
                    label="Full Name"
                    className='editprofile-textfield'
                />
            </div>

            <div className='editprofile-field'>
                <TextField 
                    fullWidth 
                    value={context.getUser.emailid || ''} 
                    variant='outlined'
                    size='small'
                    disabled
                    label="Email Address"
                    className='editprofile-textfield'
                />
            </div>

            <div className='editprofile-actions'>
                <Button
                    variant="contained"
                    className='editprofile-button editprofile-button-save'
                    onClick={updateName}
                    startIcon={<SaveRounded />}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
  )
}
