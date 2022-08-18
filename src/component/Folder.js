import Cookies from 'js-cookie';
import React, { useContext,useRef } from 'react'
import { SERVER_URL} from '../api/server';
import ContextMain from "../context/ContextMain"
import "../css/folder.css"
export default function Folder(props) {
    let {_id,folder_access_link,folder_name,folder_type,folder_extention,folder_logo,access_all,access_people,folder_add_date}=props.folder;
    const imageRef=useRef()
    const fileRef=useRef()
    const fileLogo={"csv":"excel.png","xlxs":"excel.png","excel":"excel.png","doc":"doc.png","docx":"doc.png","pdf":"pdf.png","ppt":"ppt.png","other":"exe.png"}
    const context=useContext(ContextMain);
    const handleRightClick=(e)=>{
        context.handleContextMenu(e,1,0);
    } 
    // const setImage=()=>{
    //     try{
    //         if(String(folder_logo).startsWith(SERVER_URL)){
    //             getRequestFile(`${folder_logo}?id=0`).then((url)=>{imageRef.current.src=url})
    //         }
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    //     try{
    //         getRequestFile(`${SERVER_URL}/accessFile/${folder_access_link}?id=1`,folder_extention).then((url)=>{fileRef.current.href=url})
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }
    // useEffect(()=>{
    //     setImage()
    // },[folder_logo])
  return (
    <div className='folder-main'  onMouseEnter={()=>{context.setClickFolder({folder_logo,folder_name,_id,folder_type,folder_access_link,folder_extention,access_all,access_people,folder_add_date})}} onClick={context.OpenFolder} onContextMenu={handleRightClick}>
            <div className='folder-logo-main'>
                {
                    folder_logo!==""?<img ref={imageRef} src={String(folder_logo).startsWith(SERVER_URL)?`${folder_logo}?tk=${Cookies.get("token")}&id=0`:folder_logo} className='folder-logo' alt={folder_name}/>:folder_type===1?<img alt="Folder" src='/folderLogo.png' className='folder-logo'/>:<a ref={fileRef} href={`${SERVER_URL}/accessFiles/${folder_access_link}?tk=${Cookies.get("token")}&id=1`} target="__blank__"><div className='folder-logo'>
                        <img className='folder-logo' src={(folder_extention==="jpg" || folder_extention==="jpeg" || folder_extention==="png" || folder_extention==="svg" || folder_extention==="gif")?`${SERVER_URL}/accessFiles/${folder_access_link}?tk=${Cookies.get("token")}&id=1`:fileLogo[folder_extention]?fileLogo[folder_extention]:fileLogo["other"]} alt={folder_extention} />
                        </div></a>
                }
            </div>
            <div className='folder-name'>
                {folder_name}
            </div>
    </div>
  )
}
