import React, { useContext,useEffect,useState } from 'react'
import ContextMain from '../context/ContextMain'
import {Button,TextField} from "@material-ui/core"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {SERVER_URL,getRequest,putRequest} from "../api/server"
import "../css/access.css"
export default function AccessLink() {
    const context=useContext(ContextMain)
    const [getEmail,setEmail]=useState("")
    const [accessUser,setAccessUser]=useState([])
    let folder=context.getClickFolder
    const handleClick=async(access)=>{
      context.setLoading(true)
        let res=await getRequest(`folder/r/access/${access._id}`)
        if(res.status){
            fetchAccess()
            context.Alert("Access Remove Successfully","success")
        }
        else{
          context.Alert(res.error,"error")
        }
        context.setLoading(false)
    }
    const handleAdd=async()=>{
      context.setLoading(true)
      let res=await getRequest(`folder/a/access/${folder._id}?emailid=${getEmail}`)
      if(res.status){
          fetchAccess()
          context.Alert("Person Add Successfully","success")
        }
        else{
          context.Alert(res.error,"error")
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
          context.Alert(res.error,"error")
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
            context.Alert("Access All Update Successfully","success")

          }
          else{
            context.Alert(res.error,"error")
          }
          context.setLoading(false)
    }
    useEffect(()=>{
        fetchAccess()
    },[])
    const copyLink=()=>{
      window.navigator.clipboard.writeText( `${SERVER_URL}/access/other/${folder.access_all?1:0}/${folder.folder_access_link}`)
      context.Alert("Link Copy Successfully","success")
    }
    return (
    <div className='main-access'>
        <div className='access-part-1'>
            <div className='access-part-11'>
                <TextField value={getEmail} onChange={(e)=>{setEmail(e.currentTarget.value)}} fullWidth  variant='standard' label='User Email Id'/>
            </div>
            <div className='access-part12'>
                <Button fullWidth onClick={handleAdd} variant='outlined' color="primary">Give Access</Button>
            </div>
        </div>
        <div className='access-part-2'>
              {accessUser.map((item)=>{
                return(
                  <div className='access-item-main' key={item._id} >
                    <div className='access-item-email'>
                       {item.access_by} 
                      </div> 
                      <div className='access-item-icon' onClick={()=>{handleClick(item)}}>
                      <HighlightOffIcon/>
                      </div>
                  </div>
                )
              })}
        </div>
        <div className='access-part-3'>
          <Button variant='outlined' onClick={handleAccessAll} fullWidth color="primary">{folder.access_all?"Remove Access All":"Access All"}</Button>
        </div>
        <div className='access-part-4' onClick={copyLink}>
          {`${SERVER_URL}/access/other/${folder.access_all?1:0}/${folder.folder_access_link}`}
        </div>
    </div>
  )
}
