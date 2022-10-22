import React,{useContext,useEffect,useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import ContextMain from "../context/ContextMain"
import {getRequest, SERVER_URL} from "../api/server"
export default function SideBar() {
  const context=useContext(ContextMain)
  const [space,setSpace]=useState(0)
  const getSpace=async()=>{
    let res=await getRequest("space/")
    if(res.status){
        setSpace(res.space)
    }
    else{
      setSpace(0)
    }
  }
  const [getOpen,setOpen]=React.useState(false)
  useEffect(()=>{
    if(getOpen){
      getSpace()
    }
  },[getOpen])
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer(false)}
      style={{width:"300px"}}
    >
      <div className='profile-main'>
      <div className='profile-pic' style={{cursor:"pointer"}} onClick={context.editProfile}> 
        <img src={`${String(context.getUser['profile_pic']).includes("/")?context.getUser['profile_pic']:`${SERVER_URL}/user/profile_pic/?pic=${context.getUser['profile_pic']}`}`} alt={context.getUser['emailid']}  />
        </div>
        <div className='profile-name' style={{cursor:"pointer"}} onClick={context.editProfile}>
        {context.getUser['name']}
        </div>
      </div>
      <Divider/>
      <List >
          <ListItem button onClick={()=>{context.setCurrentDir([{folder_name:"root:",_id:null,status:2}]);context.setShared(false)}} style={{backgroundColor:context.getShared?"":"aquamarine",borderRadius:context.getShared?"":20}}>
            <ListItemIcon><FileCopyIcon/></ListItemIcon>
            <ListItemText style={{fontSize:25,fontWeight:500,fontStyle:"italic"}} primary="My Drive" />
          </ListItem>
          <ListItem button onClick={()=>{context.setCurrentDir([{folder_name:"root:",_id:null,status:2}]);context.setShared(true)}} style={{backgroundColor:context.getShared?"aquamarine":"",borderRadius:context.getShared?20:""}}>
            <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary="Shared with me" />
          </ListItem>
          <ListItem button onClick={context.newFolder}>
            <ListItemIcon><FolderIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary={"New Folder"} />
          </ListItem>
          <ListItem button onClick={context.uploadFile}>
            <ListItemIcon><CloudUploadIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary="Upload File" />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon><IndeterminateCheckBoxIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary="Terminal" />
          </ListItem> */}
          <ListItem button onClick={context.logout}>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary="Logout" />
          </ListItem>
      <Divider />
          <ListItem button>
            <ListItemIcon><CloudQueueIcon/></ListItemIcon>
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary="Storage" />
          
            <ListItemText style={{fontSize:20,fontWeight:500,fontStyle:"italic"}} primary={`${Math.round(space*100)/100} MB of 1GB`} />
          </ListItem>
      </List>
      
    </div>
  );

  return (
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}><MenuIcon  /></Button>
          <Drawer anchor={"left"} open={getOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
  );
}
