import React,{useEffect, useRef, useState} from 'react'
import ContextMain from './ContextMain'
import {deleteRequest, getRequest,postRequest, putRequest} from "../api/server"
import EditFolder from '../component/EditFolder';
import Properties from '../component/Properties';
import EditProfile from '../component/EditProfile';
export default function ContextValue(props) {
  const [getAlert,setAlert]=useState({status:false,msg:"Server Error...",type:"error"});
  const [loading,setLoading]=useState(false)
  const [getShow,setShow]=useState(false)
  const [getRender,setRender]=useState(false)
  const [getCurrentDir,setCurrentDir]=useState([{folder_name:"root:",_id:null,status:2}])
  const [getUser,setUser]=useState({name:"",emailid:"",profile_pic:""})
  const [getFolders,setFolders]=useState([])
  const [getClickFolder,setClickFolder]=useState({folder_logo:"",_id: "",folder_name: "",folder_type:1,folder_access_link:"",folder_extention:"",access_all:false,access_people:[],folder_add_date:""})
  const [getAnchor,setAnchor]=useState({x:0,y:0})
  const [getCutFolder,setCutFolder]=useState({_id:"",folder_name:""})
  const [getMenuOption,setMenuOptions]=useState([])
  const [open,setOpen]=useState(false)
  const [getForward,setForward]=useState([])
  const uploadFileRef=useRef()
  const uploadFolderLogo=useRef()
  const [getDialog,setDialog]=useState({title:"",component:<></>})
  const currentValue={value:-1}
  window.document.addEventListener("click",(e)=>{
    setShow(false);
    currentValue['value']=-1;
  }) 
  const handleContextMenu=(e,value,reverse)=>{
    if(currentValue['value']!==reverse){
      currentValue['value']=value;
    }
      Run(e)
  }
  const Run=(e)=>{
    e.preventDefault()
    var width=window.innerWidth
    var height=window.innerHeight
    var left=e.pageX;
    var top=e.pageY;
    console.log([[width,left],[height,top]])
    if(left+200>=width){
        left-=(left+200-width)
    }
    if(top+420>=height){
      top-=(top+425-height)
    }
    console.log(left,top)
    setAnchor({x:left,y:top})
    SetMenuOptions(currentValue['value'])
    setShow(true)
  }
  const OpenFolder=()=>{
    if(getClickFolder.folder_type===1){
      let curr=getCurrentDir;
      curr.push({folder_name:getClickFolder.folder_name,_id:getClickFolder._id});
      setCurrentDir(curr)
      setRender(!getRender)
      setShow(false)
      fetchFolders()
    }
  }
  const editFolder=()=>{
        try{

            setOpen(true)
            setDialog({title:"Edit Folder",component:<EditFolder folder_type={getClickFolder.folder_type} folder_logo={getClickFolder.folder_logo} folder_name={getClickFolder.folder_name}  _id={getClickFolder._id} />})
        }
        catch(e){
            Alert("Server Error...")
        }
  }
  const DeleteFolder=async()=>{
        try{
          console.log(getClickFolder)
            setLoading(true)
            let res=await deleteRequest(`folder/${getClickFolder._id}`)
            setLoading(false)
            if(res.status){
                  Alert(`Folder ${getClickFolder.folder_name} Deleted SuccessFully`,"success")
                  fetchFolders()
                }
            else{
              Alert(res.error,"warning")
            }
        }
        catch(e){
          Alert("Server Error....")
        }
  }
  const PropertiesFolder=()=>{
    try{

      setOpen(true)
      setDialog({title:"Properties",component:<Properties/>})
  }
  catch(e){
      Alert("Server Error...")
  }
  }
  const MoveFolder=()=>{
        try{
            setCutFolder({_id:getClickFolder._id,folder_name:getClickFolder.folder_name})
            setRender(!getRender)
        }
        catch(e){
          Alert("Server Error....")
        }
  }
  const newFolder=async()=>{
    try{
      setLoading(true)
      let curr=getCurrentDir;
      let _id=curr[curr.length-1]._id;
      let x=String(new Date().valueOf())
      let body={folder_name:`new folder(${x.substring(x.length-5,x.length)})`}
      if(_id){
        body['folder_parent']=_id;
      }
      let res=await postRequest("folder/",body);
      setLoading(false)
      if(res.status){
          Alert(`Folder Created With Default Name 'new folder(${x.substring(x.length-5,x.length)})'`,"success")
          setRender(!getRender)
          fetchFolders()
      }
      else{
        Alert(res.error,"warning")
      }
  }
  catch(e){
    Alert("Server Error...","error")
  }
  }
  const uploadFile=()=>{
    uploadFileRef.current.click()
  }
  const openCmd=()=>{

  }
  const MovePrev=()=>{
    let curr=getCurrentDir;
    if(curr[curr.length-1]._id!==null){
      // console.log("Current Dir ",getForward)
      // let obj=getForward
      // obj.push(curr);
      // setForward(obj);
      curr.pop()
    setCurrentDir(curr)
    setRender(!getRender)
    fetchFolders()
  }
  }
  const MoveNext=()=>{
      let obj=getForward;
      if(obj.length!==0){
      setCurrentDir(obj[obj.length-1]);
      obj.pop()
      setForward(obj)
      let path=obj[obj.length-1]
      path=(path.map((item)=>item.folder_name)).join("/")
      fetchFolders(path)
      }
  }
  const reloadPage=()=>{
    fetchFolders()
  }
  const logout=async()=>{
        try{
           setLoading(true)
            let res=await getRequest("user/logout");
            setLoading(false)
            if(res.status){
                window.document.cookie=""
                window.location.href="/login"
            }
            else{
              Alert(res.error)
            }
        }
        catch(e){
          Alert("Server Error...")
        }
  }
  const getAccessLink=()=>{
      try{

      }
      catch(e){
        Alert("Server Error....")
      }
  }
  const pasteFolder=async()=>{
      try{
          if(getCutFolder._id!==""){
            let curr=getCurrentDir;
            let _id=curr[curr.length-1]._id;
            let body={}
            if(_id){
                body["folder_parent"]=_id
            }
            else{
              body["folder_parent"]="null"
            }
            setLoading(true)
            let res=await putRequest(`/folder/${getCutFolder._id}`,body)
            setLoading(false)
            if(res.status){
                Alert(`Folder ${getCutFolder.folder_name} Move Successfully`,"success")
                fetchFolders();
            }
            else{
              Alert(res.error,"warning")
            }
          }
      }
      catch(e){
        Alert("Server Error...")
      }
      setCutFolder({_id:"",folder_name:""})
  }
  const SetMenuOptions=(status)=>{
      if(status===1){
          var options=[
            {"name":"Open","action":OpenFolder},
            {"name":"Edit","action":editFolder},
            {"name":"Delete","action":DeleteFolder},
            {"name":"Cut","action":MoveFolder},
            // {"name":"Get Link","action":getAccessLink},
            {"name":"Edit Logo","action":EditFolderLogo},
            {"name":"Properties","action":PropertiesFolder},
          ]
      }
      else{
        var options=[
          {"name":"New Folder","action":newFolder},
          {"name":"Upload File","action":uploadFile},
          {"name":"Paste","action":pasteFolder},
          // {"name":"Cmd","action":openCmd},
          {"name":"Previous","action":MovePrev},
          // {"name":"Next","action":MoveNext},
          {"name":"Reload","action":reloadPage},
          {"name":"Edit Profile","action":editProfile},
          {"name":"Logout","action":logout},
        ]
      }
      setMenuOptions(options)
      setRender(!getRender)
  }
  const editProfile=()=>{
    try{
      setOpen(true)
      setDialog({title:"Edit Profile",component:<EditProfile/>})
  }
  catch(e){
      Alert("Server Error...")
  }
  }

  const EditFolderLogo=()=>{
        uploadFolderLogo.current.click()
  }
  const Alert=(msg,type="error")=>{
      setAlert({msg,type,status:true})
      setTimeout(()=>{
        setAlert({msg,type,status:false})
      },3000)
  }

  const fetchFolders=async(path)=>{
      try{
          console.log(getCurrentDir)
          setLoading(true)
          let res=await getRequest(`folder/path?path=${((path?path:getCurrentDir).map((item)=>item.folder_name)).join("/")}` )
          setLoading(false)
          if(!res.status){
            Alert(res.error,"warning");
          }
          setFolders(res.folders)
            setCurrentDir(res.dirs)
      }
      catch(e){
          Alert("Server Error...","error")
      }
  }

  const getUserData=async()=>{
      try{
          let res=await getRequest("user/")
          if(res.status){
              setUser(res.user)
          }
          else{
            Alert(res.error);
            window.location.href="/login"
          }
      }
      catch(e){
          Alert("Server Error...")
      }
  }
  useEffect(()=>{
    fetchFolders()
    // eslint-disable-next-line
  },[])
  return (
    <ContextMain.Provider value={{editProfile,uploadFolderLogo,getCutFolder,uploadFileRef,open,setOpen,getDialog,setDialog,OpenFolder,getClickFolder,setClickFolder,logout,handleContextMenu,getAnchor,setAnchor,getMenuOption,SetMenuOptions,fetchFolders,getRender,setRender,setShow,getShow,getFolders,setFolders,getAlert,getCurrentDir,setCurrentDir,Alert,loading,setLoading,getUserData,getUser,MoveNext,MovePrev,reloadPage,newFolder,editFolder,getForward,setForward}}>
        {props.children} 
    </ContextMain.Provider>
  )
}
