import Cookies from 'js-cookie';
import React, { useContext,useRef } from 'react'
import { SERVER_URL} from '../api/server';
import ContextMain from "../context/ContextMain"
import "../css/folder.css"
export default function Folder(props) {
    let {_id,folder_access_link,folder_name,folder_type,folder_extention,folder_logo,access_all,access_people,folder_add_date,space}=props.folder;
    const fileRef=useRef()
    const fileLogo={"csv":"excel.png","xlxs":"excel.png","excel":"excel.png","doc":"doc.png","docx":"doc.png","pdf":"pdf.png","ppt":"ppt.png","other":"exe.png"}
    const context=useContext(ContextMain);
    const handleRightClick=(e)=>{
        context.handleContextMenu(e,1,0);
    } 
  return (
    <div className='folder-main'  onMouseEnter={()=>{context.setClickFolder({folder_logo,folder_name,_id,folder_type,folder_access_link,folder_extention,access_all,access_people,folder_add_date,space})}} onClick={context.OpenFolder} onContextMenu={handleRightClick}>
            <div className='folder-logo-main'>
                {
                    folder_logo!==""?<img  src={String(folder_logo).includes("/")?folder_logo:`${SERVER_URL}/folder_logo/${folder_logo}`} className='folder-logo' alt={folder_name}/>:folder_type===1?<img alt="Folder" src='/folderLogo.png' className='folder-logo'/>:<a ref={fileRef} href={`${SERVER_URL}/access/${folder_type}/${folder_access_link}`} target="__blank__"><div className='folder-logo'>
                        <img className='folder-logo' src={(folder_extention==="jpg" || folder_extention==="jpeg" || folder_extention==="png" || folder_extention==="svg" || folder_extention==="gif")?`${SERVER_URL}/access/${folder_type}/${folder_access_link}`:fileLogo[folder_extention]?fileLogo[folder_extention]:fileLogo["other"]} alt={folder_extention} />
                        </div></a>
                }
            </div>
            <div className='folder-name'>
                {folder_name}
            </div>
    </div>
  )
}
