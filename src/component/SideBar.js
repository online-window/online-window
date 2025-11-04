import React,{useContext,useEffect,useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CreateNewFolderRoundedIcon from '@material-ui/icons/CreateNewFolderRounded';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import CloudRoundedIcon from '@material-ui/icons/CloudRounded';
import ContextMain from "../context/ContextMain"
import {getRequest, SERVER_URL} from "../api/server"
import "../css/sidebar.css"
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
      className="sidebar-drawer"
    >
      <div className='sidebar-profile'>
        <div className='sidebar-profile-pic' onClick={context.editProfile}> 
          <img src={`${String(context.getUser['profile_pic']).includes("/")?context.getUser['profile_pic']:`${SERVER_URL}/user/profile_pic/?pic=${context.getUser['profile_pic']}`}`} alt={context.getUser['emailid']}  />
        </div>
        <div className='sidebar-profile-name' onClick={context.editProfile}>
          {context.getUser['name']}
        </div>
        <div className='sidebar-profile-email'>
          {context.getUser['emailid']}
        </div>
      </div>
      
      <Divider className="sidebar-divider"/>
      
      <List className="sidebar-list">
        <ListItem 
          button 
          onClick={()=>{context.setCurrentDir([{folder_name:"root:",_id:null,status:2}]);context.setShared(false)}} 
          className={`sidebar-item ${!context.getShared ? 'sidebar-item-active' : ''}`}
        >
          <ListItemIcon className="sidebar-icon">
            <DescriptionRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="My Drive" />
        </ListItem>
        
        <ListItem 
          button 
          onClick={()=>{context.setCurrentDir([{folder_name:"root:",_id:null,status:2}]);context.setShared(true)}} 
          className={`sidebar-item ${context.getShared ? 'sidebar-item-active' : ''}`}
        >
          <ListItemIcon className="sidebar-icon">
            <PeopleRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="Shared with me" />
        </ListItem>
        
        <Divider className="sidebar-divider-light"/>
        
        <ListItem 
          button 
          onClick={context.newFolder}
          className="sidebar-item"
        >
          <ListItemIcon className="sidebar-icon">
            <CreateNewFolderRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="New Folder" />
        </ListItem>
        
        <ListItem 
          button 
          onClick={context.uploadFile}
          className="sidebar-item"
        >
          <ListItemIcon className="sidebar-icon">
            <CloudUploadRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="Upload File" />
        </ListItem>
        
        <Divider className="sidebar-divider-light"/>
        
        <ListItem 
          button 
          onClick={context.logout}
          className="sidebar-item sidebar-item-logout"
        >
          <ListItemIcon className="sidebar-icon">
            <ExitToAppRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      
      <div className="sidebar-storage">
        <div className="sidebar-storage-icon">
          <CloudRoundedIcon/>
        </div>
        <div className="sidebar-storage-info">
          <div className="sidebar-storage-label">Storage Used</div>
          <div className="sidebar-storage-value">
            <strong>{Math.round(space*100)/100} MB</strong> of 1 GB
          </div>
          <div className="sidebar-storage-bar">
            <div 
              className="sidebar-storage-bar-fill" 
              style={{width: `${Math.min((space/1024)*100, 100)}%`}}
              title={`${((space/1024)*100).toFixed(2)}% used`}
            />
          </div>
          <div className="sidebar-storage-percentage">
            {((space/1024)*100).toFixed(2)}% used
          </div>
        </div>
      </div>
    </div>
  );

  return (
        <React.Fragment>
          <Button onClick={toggleDrawer(true)} className="sidebar-menu-btn">
            <MenuRoundedIcon />
          </Button>
          <Drawer 
            anchor={"left"} 
            open={getOpen} 
            onClose={toggleDrawer(false)}
            classes={{paper: 'sidebar-paper'}}
          >
            {list()}
          </Drawer>
        </React.Fragment>
  );
}
