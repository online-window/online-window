import Login from "./component/Login";
import {Routes,Route, Navigate} from "react-router-dom"
import Signup from "./component/Signup";
import Loader from "./component/Loader";
import Alert from "./component/Alert";
import FolderMenu from "./component/FolderMenu";
import { useContext } from "react";
import ContextMain from "./context/ContextMain";
import Home from "./component/Home";
import DialogBox from "./component/DialogBox";
import { postRequestFile } from "./api/server";
function App() {
  const context=useContext(ContextMain)
  const handleChange=async(file)=>{
        try{
            if(Object.keys(file.currentTarget.files).length===0){
              return;
            }
            let curr=context.getCurrentDir;
            let _id=curr[curr.length-1]._id
            var formdata=new FormData()
            for(let key in file.currentTarget.files){
              formdata.append("files"+key,file.currentTarget.files[key]);
            }
            if(_id){
              formdata.append("folder_parent",_id)
            }
            context.setLoading(true)
            let res=await postRequestFile(`file`,formdata);
            context.setLoading(false)
            if(res.status){
              context.Alert("File Upload SuccessFully","success");
              context.fetchFolders()
              context.uploadFileRef.current.value=""
            }
            else{
              context.Alert(res.error,"warning")
            }
        }
        catch(e){
          console.log(e)
            context.Alert("Server Error....")
        }
  }
  const handleLogoChange=async(file)=>{
    try{
      if(Object.keys(file.currentTarget.files).length===0){
        return;
      }
      let curr=context.getClickFolder;
      let _id=curr._id
      var formdata=new FormData()
      formdata.append("logo",file.currentTarget.files[0])
      context.setLoading(true)
      let res=await postRequestFile(`file/logo/${_id}`,formdata);
      context.setLoading(false)
      if(res.status){
        context.Alert("Folder Logo Updated","success");
        context.fetchFolders()
        context.uploadFolderLogo.current.value=""
      }
      else{
        context.Alert(res.error,"warning")
      }
  }
  catch(e){
    console.log(e)
      context.Alert("Server Error....")
  }
  }
  return (
    <>
      <input style={{display:"none"}} type="file" multiple ref={context.uploadFileRef} onChange={handleChange} />
      <input style={{display:"none"}} type="file" accept=".jpg,.png" ref={context.uploadFolderLogo} onChange={handleLogoChange} />
      {context.getAlert.status && <Alert type={context.getAlert.type} msg={context.getAlert.msg}/>}
      {context.getShow && <FolderMenu x={context.getAnchor.x} y={context.getAnchor.y}/>}
      <DialogBox/>
      <Loader/>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/:id" element={<Home/>} />
      <Route path="/" element={<Home/>} />
      {/* <Route path="/*" element={<Navigate to={"/"}/>} /> */}
      </Routes>
    </>
  );
}

export default App;
