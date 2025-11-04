import React, { useContext } from 'react'
import "../css/null.css"
import ContextMain from '../context/ContextMain'
import CloudOffRoundedIcon from '@material-ui/icons/CloudOffRounded';
import FolderOpenRoundedIcon from '@material-ui/icons/FolderOpenRounded';

export default function NullComponent() {
    const context = useContext(ContextMain);
  return (
    <div className='null-main'>
        <div className='null-container'>
            <div className='null-icon-wrapper'>
                {context.getShared ? (
                    <CloudOffRoundedIcon className='null-icon' />
                ) : (
                    <FolderOpenRoundedIcon className='null-icon' />
                )}
            </div>
            <div className='null-content'>
                <div className='null-title'>
                    {context.getShared ? "No Shared Files" : "Empty Folder"}
                </div>
                <div className='null-text'>
                    {context.getShared 
                        ? "No files have been shared with you yet" 
                        : "Drop files here or create a new folder to get started"}
                </div>
            </div>
        </div>
    </div>
  )
}
