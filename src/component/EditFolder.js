import { Button, TextField } from '@material-ui/core'
import React,{useContext, useState} from 'react'
import { putRequest } from '../api/server'
import ContextMain from '../context/ContextMain'
import EditRounded from '@material-ui/icons/EditRounded';
import FolderRounded from '@material-ui/icons/FolderRounded';
import ImageRounded from '@material-ui/icons/ImageRounded';
import SaveRounded from '@material-ui/icons/SaveRounded';
import '../css/editfolder.css'

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
    
    const [getName,setName]=useState(folder_name)
    const [getLogo,setLogo]=useState(props.folder_logo)
    const [alert,setAlert]=useState({show:false, message:'', type:''})
    const context=useContext(ContextMain)
    
    const showAlert = (message, type) => {
        setAlert({show: true, message, type})
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 3000)
    }
    
    const handleClick=async()=>{
        try{
            if(getName.trim() === ""){
                showAlert("Name cannot be empty", "error")
                return
            }
            
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
                    showAlert("Updated successfully","success")
                    context.fetchFolders()
                    setTimeout(() => {
                        context.setOpen(false)
                    }, 1500)
                }
                else{
                    showAlert(res.error,"error")
                }
            }
        }
        catch(e){
            console.log(e)
            showAlert("Server Error...","error")
        }
    }
    
  return (
    <div className='editfolder-container'>
        {alert.show && (
            <div className={`editfolder-alert editfolder-alert-${alert.type}`}>
                <div className='editfolder-alert-content'>
                    {alert.type === 'success' ? '✓' : '✕'} {alert.message}
                </div>
            </div>
        )}
        <div className='editfolder-form'>
            <div className='editfolder-field'>
                <div className='editfolder-field-icon'>
                    <FolderRounded />
                </div>
                <TextField 
                    value={getName} 
                    onChange={(e)=>{setName(e.currentTarget.value)}} 
                    fullWidth 
                    variant='outlined'
                    size='small'
                    label={props.folder_type === 1 ? "Folder Name" : "File Name"}
                    className='editfolder-textfield'
                />
            </div>

            {/* <div className='editfolder-field'>
                <div className='editfolder-field-icon'>
                    <ImageRounded />
                </div>
                <TextField 
                    value={getLogo} 
                    onChange={(e)=>{setLogo(e.currentTarget.value)}} 
                    fullWidth 
                    variant='outlined'
                    size='small'
                    label="Logo URL"
                    placeholder="Enter image URL"
                    className='editfolder-textfield'
                />
            </div> */}

            {folder_extention && (
                <div className='editfolder-info'>
                    <span className='editfolder-info-label'>Extension:</span>
                    <span className='editfolder-info-value'>{folder_extention}</span>
                </div>
            )}

            <div className='editfolder-actions'>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    className='editfolder-button editfolder-button-save'
                    startIcon={<SaveRounded />}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
  )
}
