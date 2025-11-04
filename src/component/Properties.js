import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import { SERVER_URL } from '../api/server';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import '../css/properties.css'

export default function Properties() {
    const context=useContext(ContextMain)
    let {folder_name,folder_add_date,folder_extention,folder_logo,space}=context.getClickFolder;
    let path=(context.getCurrentDir.map((item)=>item.folder_name)).join("/")+`/${folder_name}`
    
    const formatSpace = (space) => {
        const kb = parseFloat(space);
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        if (mb < 1024) return `${mb.toFixed(2)} MB`;
        const gb = mb / 1024;
        return `${gb.toFixed(2)} GB`;
    }

    return (
    <div className='properties-container'>
        <div className='properties-header'>
            <InfoRoundedIcon className='properties-header-icon' />
            <span className='properties-header-title'>Folder Properties</span>
        </div>

        <div className='properties-preview'>
            <div className='properties-image-wrapper'>
                <img 
                    src={folder_logo!==""?String(folder_logo).includes("/")?folder_logo:`${SERVER_URL}/folder_logo/${folder_logo}`:"/folderLogo.png"} 
                    alt="Folder Logo"
                    className='properties-image'
                />
            </div>
            <div className='properties-preview-name'>{folder_name}</div>
        </div>

        <div className='properties-divider'></div>

        <div className='properties-details'>
            <div className='properties-field'>
                <div className='properties-field-icon'>
                    <FolderRoundedIcon />
                </div>
                <div className='properties-field-content'>
                    <div className='properties-field-label'>Folder Name</div>
                    <div className='properties-field-value'>{folder_name}</div>
                </div>
            </div>

            <div className='properties-field'>
                <div className='properties-field-icon'>
                    <TimelineRoundedIcon />
                </div>
                <div className='properties-field-content'>
                    <div className='properties-field-label'>Path</div>
                    <div className='properties-field-value properties-path'>{path}</div>
                </div>
            </div>

            <div className='properties-field'>
                <div className='properties-field-icon'>
                    <StorageRoundedIcon />
                </div>
                <div className='properties-field-content'>
                    <div className='properties-field-label'>Space Used</div>
                    <div className='properties-field-value'>{formatSpace(space)}</div>
                </div>
            </div>

            <div className='properties-field'>
                <div className='properties-field-icon'>
                    <ExtensionRoundedIcon />
                </div>
                <div className='properties-field-content'>
                    <div className='properties-field-label'>Extension</div>
                    <div className='properties-field-value'>{folder_extention || 'Folder'}</div>
                </div>
            </div>

            <div className='properties-field'>
                <div className='properties-field-icon'>
                    <EventRoundedIcon />
                </div>
                <div className='properties-field-content'>
                    <div className='properties-field-label'>Created Date</div>
                    <div className='properties-field-value'>{folder_add_date}</div>
                </div>
            </div>
        </div>
    </div>
  )
}
