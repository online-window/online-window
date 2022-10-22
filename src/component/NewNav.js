import React, { useContext ,useState} from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ReplayIcon from '@material-ui/icons/Replay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextField} from "@material-ui/core"
import ContextMain from "../context/ContextMain"
import "../css/newnav.css"
import {SERVER_URL} from "../api/server"
import SideBar from './SideBar';

export default function NewNav() {
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
          setEnable(!context.getShared) 
        } 
    }
    const captureEnter=(e)=>{
          if(e.keyCode===13){
            handleTextClick()
          }
    }
  return (
    <div className='nav-main'>
        <div className='nav-submain'>
            <div className='nav-menu'>
                <SideBar/>
            </div>
            <div className='nav-pro-logo'>
                <div className='nav-logo'>
                My Drive
                </div>
            </div>
            <div className='nav-part'>
                    <div className='nav-part-sub1'>
                        <div className='nav-search'>
                            <TextField  onKeyUp={captureEnter} value={getPath} disabled={!getEnable}  onDoubleClick={handleTextClick} onClick={()=>{setEnable(!context.getShared)}} onChange={(e)=>{setPath(e.currentTarget.value)}} variant="outlined" style={{width:"100%",backgroundColor:"white"}} fullwWidth />
                        </div>
                    </div>
                    <div className='nav-part-sub2'>
                        <div className='nav-icons'>
                            <div className='nav-icon-left' onClick={context.MovePrev}>
                                <KeyboardBackspaceIcon  style={{fontSize:35,color:context.getCurrentDir[context.getCurrentDir.length-1]._id===null?"grey":"black",cursor:(context.getCurrentDir[context.getCurrentDir.length-1]._id===null?"default":"pointer")}}/>
                            </div>
                            <div className='nav-icon-reload'>
                                <ReplayIcon onClick={context.reloadPage} style={{fontSize:35,cursor:"pointer"}}/>
                            </div>
                         </div>
                    </div>
            </div>
        </div>
    </div>
  )
}
