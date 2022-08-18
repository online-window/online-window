import React, { useContext ,useState} from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ReplayIcon from '@material-ui/icons/Replay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextField} from "@material-ui/core"
import ContextMain from "../context/ContextMain"
import "../css/navbar.css"
import Cookies from 'js-cookie';
export default function Navbar() {
  const [getEnable,setEnable]=useState(false)
  const context=useContext(ContextMain)
  let path=(context.getCurrentDir.map((item)=>item.folder_name)).join("/")
  const [getPath,setPath]=useState(path)
  if(getPath!==path && !getEnable){
    setPath(path)
  }
  const handleTextClick=()=>{
      if(getEnable){
          setEnable(false)
          let path=String(getPath).replaceAll("\\","/")
          path=path.split("/")
          path=path.map((item)=>{return ({folder_name:item,_id:null})})
          context.setCurrentDir(path)
          context.fetchFolders(path)
          context.setForward([])
      }
      else{
        setEnable(true) 
      } 
  }
  const captureEnter=(e)=>{
        if(e.keyCode===13){
          handleTextClick()
        }
  }
  return (
    <div className='nav-main' >
      <div className='nav-foot'>
        <div className='nav-foot-part-1'>
            <div className='nav-foot-item' onClick={context.MovePrev}>
                <KeyboardBackspaceIcon  style={{fontSize:35,color:context.getCurrentDir[context.getCurrentDir.length-1]._id===null?"grey":"black",cursor:(context.getCurrentDir[context.getCurrentDir.length-1]._id===null?"default":"pointer")}}/>
            </div>
            <div className='nav-foot-item'>
                <ReplayIcon onClick={context.reloadPage} style={{fontSize:35,cursor:"pointer"}}/>
            </div>
            {/* <div className='nav-foot-item'>
              <ArrowRightAltIcon style={{fontSize:35,color:context.getForward.length===0?"grey":"black",cursor:context.getForward.length===0?"default":"pointer"}} />
            </div> */}
        </div>
        <div className='nav-foot-part-2'>
              <TextField onKeyUp={captureEnter} value={getPath} disabled={!getEnable}  onDoubleClick={handleTextClick} onClick={()=>{setEnable(true)}} onChange={(e)=>{setPath(e.currentTarget.value)}} variant="outlined" style={{paddingInline:6,width:"100%",backgroundColor:"white"}} fullwWidth />
        </div>
      </div>
      <div className='nav-head' >
        <div className='nav-head-item' onClick={context.newFolder}>
        <img src="/folderLogo.png" alt='New Folder'  />
        </div>
        {/* <div className='nav-head-item'>
        <img src="/cmdLogo.png" alt='Command Promt'  />
        </div> */}
        <div className='nav-head-profile' style={{cursor:"pointer"}} onClick={context.editProfile}> 
        <img src={`${context.getUser['profile_pic']}?tk=${Cookies.get("token")}`} alt={context.getUser['emailid']}  />
        </div>
        <div className='nav-head-profile-name' style={{cursor:"pointer"}} onClick={context.editProfile}>
        {context.getUser['name']}
        </div>
        <div className='nav-head-logout' onClick={context.logout}>
        <ExitToAppIcon style={{fontSize:45}}/>
        </div>
      </div>
    </div>
  )
}
