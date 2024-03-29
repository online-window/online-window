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
            <div key={item.name} className='menu-item-main'>
            <div className="menu-item" onMouseDown={(e)=>{e.stopPropagation();e.preventDefault();item.action(props.folder);context.setShow(false)}}>
              {item.name}
            </div>
            <Divider/>
            </div>
          )
        })
      }
        
        </div>
  )
}
