import React, { useContext } from 'react'
import "../css/foldermenu.css"
import {Divider} from "@material-ui/core"
import ContextMain from '../context/ContextMain'
export default function FolderMenu(props) {
  const context=useContext(ContextMain)
  let options=context.getMenuOption;
  return (
    <div className="menu" style={{left:props.x,top:props.y}}>
        {options.map((item)=>{
          return(
            <>
            <div className="menu-item" onClick={()=>{item.action(props.folder)}}>
              {item.name}
            </div>
            <Divider/>
            </>
          )
        })
      }
        
        </div>
  )
}
