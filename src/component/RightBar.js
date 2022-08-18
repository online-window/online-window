import React, { useContext,useState } from 'react'
import ContextMain from '../context/ContextMain'
import Folder from './Folder'
import "../css/rightbar.css"

export default function RightBar() {
  const context=useContext(ContextMain)
  return (
    <div className='rightbar-main' >
        {
          context.getFolders.map((folder)=>{
            if(folder._id===context.getCutFolder._id){
                return(<></>)
            }
            return(
              <Folder folder={folder} key={folder._id} />
            )
          })
        }
    </div>
  )
}
