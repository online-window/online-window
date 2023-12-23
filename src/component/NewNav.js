import React, { useContext, useState } from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ReplayIcon from "@material-ui/icons/Replay";
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
      <div className="nav-submain">
        <div className="nav-menu">
          <SideBar />
        </div>
        <div className="nav-pro-logo">
          <div className="nav-logo" tabIndex="0" onKeyUp={(event)=>{if(event.key==="Enter"){window.location.reload()}}} onClick={()=>{window.location.reload()}}>My Drive</div>
        </div>
        <div className="nav-part">
          <div className="nav-part-sub1">
            <div className="nav-search">
              <div
              tabIndex="0"
              onKeyUp={(event)=>{if(event.key==="Enter"){context.MovePrev()}}}
                onClick={context.MovePrev}
                style={{ width: "5%", textAlign: "center" }}
              >
                <KeyboardBackspaceIcon

                  style={{
                    color:
                      context.getCurrentDir[context.getCurrentDir.length - 1]
                        ._id === null
                        ? "grey"
                        : "black",
                    cursor:
                      context.getCurrentDir[context.getCurrentDir.length - 1]
                        ._id === null
                        ? "default"
                        : "pointer",
                  }}
                />
              </div>
              <div style={{ width: "90%" }}>
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
                    style={{ width: "100%", backgroundColor: "white" }}
                    fullwWidth
                  />
                )}
              </div>

              <div
              tabIndex="0"
              onKeyUp={(event)=>{if(event.key==="Enter"){context.reloadPage()}}}
                onClick={context.reloadPage}
                style={{ width: "5%", textAlign: "center" }}
              >
                <ReplayIcon style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
