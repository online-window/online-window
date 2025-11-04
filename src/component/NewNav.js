import React, { useContext, useState } from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import { TextField } from "@material-ui/core";
import ContextMain from "../context/ContextMain";
import "../css/newnav.css";
import SideBar from "./SideBar";
import LinkBar from "./LinkBar";

export default function NewNav() {
  const context = useContext(ContextMain);
  let path = context.getCurrentDir.map((item) => item.folder_name).join("/");
  const [getPath, setPath] = useState(path);
  if (getPath !== path && !context.getEnable) {
    setPath(path);
  }
  const handleTextClick = () => {
    if (context.getEnable) {
      context.setEnable(false);
      let path = String(getPath).replaceAll("\\", "/");
      path = path.split("/");
      path = path.map((item) => {
        return { folder_name: item, _id: null };
      });
      context.setCurrentDir(path);
      context.fetchFolders(path);
      context.setForward([]);
    } else {
      context.setEnable(false);
    }
  };
  const captureEnter = (e) => {
    if (e.key==="Enter") {
      handleTextClick();
    }
  };
  return (
    <div className="nav-main">
      <div className="nav-container">
        <div className="nav-left">
          <div className="nav-menu">
            <SideBar />
          </div>
          <div className="nav-brand">
            <div className="nav-logo" tabIndex="0" onKeyUp={(event)=>{if(event.key==="Enter"){window.location.reload()}}} onClick={()=>{window.location.reload()}}>
              <span className="nav-logo-icon">CT</span>
              <span className="nav-logo-text">Drive</span>
            </div>
          </div>
        </div>
        
        <div className="nav-center">
          <div className="nav-search-bar">
            <button
              className="nav-icon-btn nav-back-btn"
              tabIndex="0"
              onKeyUp={(event)=>{if(event.key==="Enter"){context.MovePrev()}}}
              onClick={context.MovePrev}
              disabled={context.getCurrentDir[context.getCurrentDir.length - 1]._id === null}
              aria-label="Go back"
              title="Go back"
            >
              <ArrowBackRoundedIcon />
            </button>
            
            <div className="nav-path-container">
              {!context.getEnable ? (
                <LinkBar setEnable={context.setEnable} />
              ) : (
                <TextField
                  tabIndex="0"
                  onKeyUp={captureEnter}
                  value={getPath}
                  disabled={!context.getEnable}
                  onChange={(e) => {
                    setPath(e.currentTarget.value);
                  }}
                  variant="outlined"
                  size="small"
                  className="nav-path-input"
                  fullWidth
                />
              )}
            </div>

            <button
              className="nav-icon-btn nav-reload-btn"
              tabIndex="0"
              onKeyUp={(event)=>{if(event.key==="Enter"){context.reloadPage()}}}
              onClick={context.reloadPage}
              aria-label="Reload"
              title="Reload"
            >
              <RefreshRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
