import React, { useContext } from "react";
import ComputerRoundedIcon from "@material-ui/icons/ComputerRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import ContextMain from "../context/ContextMain";
import { Box } from "@material-ui/core";
import "../css/links.css";
export default function LinkBar(props) {
  const context = useContext(ContextMain);
  return (
    <Box className="link-main">
      <Box
        className="link-item"
        tabIndex="0"
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            props.setEnable(true);
          }
        }}
        onClick={() => {
          props.setEnable(true);
        }}
      >
        <ComputerRoundedIcon style={{ fontSize: 25 }} />
      </Box>
      <Box className="link-sub">
        {context.getCurrentDir
          .slice(
            Math.max(0, context.getCurrentDir.length - 6),
            context.getCurrentDir.length
          )
          .map((item) => {
            return (
              <Box className="link-sub-div" key={item._id}>
                <Box className="link-icon">
                  <KeyboardArrowRightRoundedIcon style={{ fontSize: 25 }} />
                </Box>
                <Box
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
                  className="link-item"
                >
                  {item.folder_name}
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
