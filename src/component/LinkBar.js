import React, { useContext } from "react";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ContextMain from "../context/ContextMain";
import "../css/links.css";

export default function LinkBar(props) {
  const context = useContext(ContextMain);
  
  return (
    <div className="link-main">
      <button
        className="link-chip link-home-chip"
        tabIndex="0"
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            props.setEnable(true);
          }
        }}
        onClick={() => {
          props.setEnable(true);
        }}
        aria-label="Home directory"
        title="Click to edit path"
      >
        <HomeRoundedIcon className="link-chip-icon" />
        <span className="link-chip-text">Home</span>
        <EditRoundedIcon className="link-edit-icon" />
      </button>
      
      <div className="link-breadcrumb">
        {context.getCurrentDir
          .slice(
            Math.max(0, context.getCurrentDir.length - 5),
            context.getCurrentDir.length
          )
          .map((item, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <div className="link-breadcrumb-item" key={index}>
                <div className="link-separator">
                  <NavigateNextRoundedIcon />
                </div>
                <button
                  className={`link-chip link-folder-chip ${isLast ? 'link-chip-active' : ''}`}
                  tabIndex="0"
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      context.MoveToFolder(item.folder_name);
                    }
                  }}
                  onClick={() => {
                    context.MoveToFolder(item.folder_name);
                  }}
                  title={item.folder_name}
                  aria-label={`Navigate to ${item.folder_name}`}
                >
                  <FolderRoundedIcon className="link-chip-icon" />
                  <span className="link-chip-text">{item.folder_name}</span>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
