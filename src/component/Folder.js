import React, { useContext, useRef } from "react";
import { SERVER_URL } from "../api/server";
import ContextMain from "../context/ContextMain";
import "../css/folder.css";
import { Navigate } from "react-router";
import { Box } from "@material-ui/core";
export default function Folder(props) {
  let {
    _id,
    folder_access_link,
    folder_name,
    folder_type,
    folder_extention,
    folder_logo,
    access_all,
    access_people,
    folder_add_date,
    space,
  } = props.folder;
  const { isBlur } = props;
  const fileRef = useRef();
  const fileLogo = {
    csv: "excel.png",
    xlxs: "excel.png",
    excel: "excel.png",
    doc: "doc.png",
    docx: "doc.png",
    pdf: "pdf.png",
    ppt: "ppt.png",
    other: "exe.png",
    pptx: "ppt.png",
  };
  const context = useContext(ContextMain);
  const handleRightClick = (e) => {
    handleSave();
    context.handleContextMenu(e, 1, 0);
  };
  const handleSave = () => {
    context.setClickFolder({
      ...context.getClickFolder,
      folder_logo,
      folder_name,
      _id,
      folder_type,
      folder_access_link,
      folder_extention,
      access_all,
      access_people,
      folder_add_date,
      space,
    });
  };
  return (
    <div
    tabIndex="0"
      title="a\nb\nc\n"
      className={`folder-main ${_id===context.getClickFolder._id?"folder-main-hover":""}`}
      onFocus={()=>{
          handleSave();
      }}
      onBlur={()=>{
        context.setClickFolder({...context.getClickFolder,_id:""})
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if(context.getClickFolder._id===_id){
          context.OpenFolder();
        }
        else{
          handleSave();
        }
      }}
      onContextMenu={handleRightClick}
    >
      <div
        style={{ filter: isBlur ? "blur(5px)" : "" }}
        className="folder-logo-main"
      >
          {folder_logo !== "" ? (
            <img
              src={
                String(folder_logo).includes("/")
                  ? folder_logo
                  : `${SERVER_URL}/folder_logo/${folder_logo}`
              }
              alt={folder_name}
            />
          ) : folder_type === 1 ? (
            <img alt="Folder" src="/folderLogo.png" />
          ) : (
              <img
                onClick={()=>{window.open(`${SERVER_URL}/access/${folder_type}/${folder_access_link}`)}}
                src={
                  folder_extention === "jpg" ||
                  folder_extention === "jpeg" ||
                  folder_extention === "png" ||
                  folder_extention === "svg" ||
                  folder_extention === "gif"
                    ? `${SERVER_URL}/access/${folder_type}/${folder_access_link}`
                    : fileLogo[folder_extention]
                    ? fileLogo[folder_extention]
                    : fileLogo["other"]
                }
                alt={folder_extention}
              />
          )}
      </div>
      <div className="folder-name">{folder_name}</div>
    </div>
  );
}
