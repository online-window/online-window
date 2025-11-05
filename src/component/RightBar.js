import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import Folder from './Folder'
import "../css/rightbar.css"
import NullComponent from './NullComponent'

export default function RightBar() {
  const context=useContext(ContextMain)
  
  return (
    <div className='rightbar-container'>
      <div className='rightbar-main'>
        {
          context.getFolders.length===0 && <NullComponent/>
        }
        {
          context.getFolders.map((folder)=>{
            return(
              <Folder 
                isBlur={folder._id===context.getCutFolder._id} 
                isCopy={folder._id===context.getCopyFolder._id} 
                folder={folder} 
                key={folder._id} 
              />
            )
          })
        }
      </div>
    </div>
  )
}
