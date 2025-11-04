import React, { useContext,useEffect,useState } from 'react'
import ContextMain from '../context/ContextMain'
import {Button,TextField} from "@material-ui/core"
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import ContentCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import {SERVER_URL,getRequest,putRequest} from "../api/server"
import "../css/access.css"
export default function AccessLink() {
    const context=useContext(ContextMain)
    const [getEmail,setEmail]=useState("")
    const [accessUser,setAccessUser]=useState([])
    const [alert,setAlert]=useState({show:false, message:'', type:''})
    let folder=context.getClickFolder
    
    const showAlert = (message, type) => {
        setAlert({show: true, message, type})
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 3000)
    }
    const handleClick=async(access)=>{
      context.setLoading(true)
        let res=await getRequest(`folder/r/access/${access._id}`)
        if(res.status){
            fetchAccess()
            showAlert("Access removed successfully","success")
        }
        else{
          showAlert(res.error,"error")
        }
        context.setLoading(false)
    }
    const handleAdd=async()=>{
      context.setLoading(true)
      let res=await getRequest(`folder/a/access/${folder._id}?emailid=${getEmail}`)
      if(res.status){
          fetchAccess()
          showAlert("Person added successfully","success")
        }
        else{
          showAlert(res.error,"error")
        }
        setEmail("")
        context.setLoading(false)
    }
    const fetchAccess=async()=>{
      context.setLoading(true)
        let res=await getRequest(`folder/g/access/${folder._id}`)
        if(res.status){
            setAccessUser(res.data);
        }
        else{
          showAlert(res.error,"error")
        }
        context.setLoading(false)
    }
    const handleAccessAll=async()=>{
      context.setLoading(true)
          let access_all=!folder.access_all;
          let res=await putRequest(`folder/${folder._id}`,{access_all});
          if(res.status){
            context.setClickFolder({...folder,access_all})
            context.fetchFolders()
            showAlert("Access updated successfully","success")

          }
          else{
            showAlert(res.error,"error")
          }
          context.setLoading(false)
    }
    useEffect(()=>{
        fetchAccess()
    },[])
    const copyLink=()=>{
      window.navigator.clipboard.writeText( `${SERVER_URL}/access/other/${folder.access_all?1:0}/${folder.folder_access_link}`)
      showAlert("Link copied to clipboard","success")
    }
    return (
    <div className='access-container'>
        {alert.show && (
            <div className={`access-alert access-alert-${alert.type}`}>
                <div className='access-alert-content'>
                    {alert.type === 'success' ? '✓' : '✕'} {alert.message}
                </div>
            </div>
        )}
        <div className='access-header'>
            <div className='access-header-left'>
                <ShareRoundedIcon className='access-header-icon' />
                <h3 className='access-header-title'>Share & Access</h3>
            </div>
            <div className={`access-status-badge ${folder.access_all ? 'access-status-public' : 'access-status-private'}`}>
                {folder.access_all ? (
                    <>
                        <PublicRoundedIcon className='access-status-icon' />
                        <span>Public</span>
                    </>
                ) : (
                    <>
                        <LockRoundedIcon className='access-status-icon' />
                        <span>Private</span>
                    </>
                )}
            </div>
        </div>

        <div className='access-add-section'>
            <TextField 
                value={getEmail} 
                onChange={(e)=>{setEmail(e.currentTarget.value)}} 
                fullWidth  
                variant='outlined' 
                label='Email Address'
                placeholder='example@email.com'
                size='small'
                className='access-textfield'
                InputProps={{
                    className: 'access-textfield-input'
                }}
                InputLabelProps={{
                    className: 'access-textfield-label'
                }}
            />
            <Button 
                onClick={handleAdd} 
                className='access-btn access-btn-add'
                startIcon={<PersonAddRoundedIcon />}
                disabled={!getEmail.trim()}
            >
                Add
            </Button>
        </div>

        {accessUser.length > 0 && (
            <div className='access-users-section'>
                <div className='access-section-title'>
                    Shared with {accessUser.length} {accessUser.length === 1 ? 'person' : 'people'}
                </div>
                <div className='access-users-list'>
                    {accessUser.map((item)=>{
                        return(
                            <div className='access-user-item' key={item._id}>
                                <div className='access-user-avatar'>
                                    {item.access_by.charAt(0).toUpperCase()}
                                </div>
                                <div className='access-user-info'>
                                    <div className='access-user-email'>
                                        {item.access_by}
                                    </div>
                                    <div className='access-user-label'>Can view</div>
                                </div>
                                <button 
                                    className='access-user-remove'
                                    onClick={()=>{handleClick(item)}}
                                    aria-label='Remove access'
                                    title='Remove access'
                                >
                                    <RemoveCircleOutlineRoundedIcon/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}

        <div className='access-divider'></div>

        <div className='access-public-section'>
            <div className='access-section-title'>General Access</div>
            <Button 
                variant='contained' 
                onClick={handleAccessAll} 
                fullWidth 
                className={`access-btn access-toggle-btn ${folder.access_all ? 'access-btn-public' : 'access-btn-private'}`}
                startIcon={folder.access_all ? <PublicRoundedIcon /> : <LockRoundedIcon />}
            >
                {folder.access_all ? "Anyone with link" : "Specific people only"}
            </Button>
            <div className='access-toggle-hint'>
                {folder.access_all 
                    ? "Anyone with the link can view this folder" 
                    : "Only invited people can view this folder"}
            </div>
        </div>

        <div className='access-link-section'>
            <div className='access-section-title'>Copy Link</div>
            <div className='access-link-box' onClick={copyLink} title='Click to copy link'>
                <div className='access-link-icon'>
                    <ContentCopyRoundedIcon />
                </div>
                <div className='access-link-url'>
                    {`${SERVER_URL}/access/other/${folder.access_all?1:0}/${folder.folder_access_link}`}
                </div>
            </div>
            <div className='access-link-hint'>
                <ContentCopyRoundedIcon className='access-hint-icon' />
                Click to copy
            </div>
        </div>
    </div>
  )
}
