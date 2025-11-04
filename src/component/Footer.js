import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import "../css/footer.css"
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';

export default function Footer() {
  const context=useContext(ContextMain)
  
  const formatSpace = (space) => {
    const mb = parseFloat(space);
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }

  return (
    <div className='footer-main'>
        <div className='footer-item'>
            <FolderRoundedIcon className='footer-icon' />
            <span className='footer-text'>
                <span className='footer-count'>{context.getFolders.length}</span> 
                {context.getFolders.length === 1 ? ' item' : ' items'}
            </span>
        </div>
        <div className='footer-divider'></div>
        <div className='footer-item'>
            <StorageRoundedIcon className='footer-icon' />
            <span className='footer-text'>{formatSpace(context.getCurrSpace)}</span>
        </div>
    </div>
  )
}
