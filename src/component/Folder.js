import React, { useContext, useRef } from "react";
import { SERVER_URL } from "../api/server";
import ContextMain from "../context/ContextMain";
import "../css/folder.css";
import { Navigate } from "react-router";

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
  
  const isSelected = _id === context.getClickFolder._id;
  
  return (
    <div
      tabIndex="0"
      className={`folder-main ${isSelected ? "folder-main-selected" : ""} ${isBlur ? "folder-cut" : ""}`}
      onFocus={() => {
        handleSave();
      }}
      onBlur={() => {
        context.setClickFolder({ ...context.getClickFolder, _id: "" });
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (context.getClickFolder._id === _id) {
          context.OpenFolder();
        } else {
          handleSave();
        }
      }}
      onContextMenu={handleRightClick}
    >
      {isBlur && (
        <div className="folder-cut-badge">
          <span className="folder-cut-icon">✂</span>
          <span className="folder-cut-text">Cut</span>
        </div>
      )}
      <div className="folder-logo-wrapper">
        {folder_logo !== "" ? (
          <img
            src={
              String(folder_logo).includes("/")
                ? folder_logo
                : `${SERVER_URL}/folder_logo/${folder_logo}`
            }
            alt={folder_name}
            className="folder-logo-image"
          />
        ) : folder_type === 1 ? (
          <img alt="Folder" src="/folderLogo.png" className="folder-logo-image" />
        ) : (
          <img
            onClick={() => {
              window.open(
                `${SERVER_URL}/access/${folder_type}/${folder_access_link}`
              );
            }}
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
            className="folder-logo-image"
          />
        )}
      </div>
      <div className="folder-name" title={folder_name}>
        {folder_name}
      </div>
    </div>
  );
}
