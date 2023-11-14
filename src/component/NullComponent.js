import React, { useContext } from 'react'
import "../css/null.css"
import ContextMain from '../context/ContextMain'
export default function NullComponent() {
    const context = useContext(ContextMain);
  return (
    <div className='null-main'>
        <div className='null-sub'>

        <div className='null-img'>
            <img src='./null.jpg' alt='Null Image'/>
        </div>
        <div className='null-text'>
            {context.getShared?"No File Shared With You":"Drop File Here Or Create New Folder"}
        </div>
        </div>
    </div>
  )
}
