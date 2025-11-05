import React, { useContext } from 'react'
import "../css/foldermenu.css"
import ContextMain from '../context/ContextMain'
import FolderOpenRounded from '@material-ui/icons/FolderOpenRounded';
import EditRounded from '@material-ui/icons/EditRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import GetAppRounded from '@material-ui/icons/GetAppRounded';
import InfoRounded from '@material-ui/icons/InfoRounded';
import CreateNewFolderRounded from '@material-ui/icons/CreateNewFolderRounded';
import PublishRounded from '@material-ui/icons/PublishRounded';
import FileCopyRounded from '@material-ui/icons/FileCopyRounded';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import RefreshRounded from '@material-ui/icons/RefreshRounded';
import PersonRounded from '@material-ui/icons/PersonRounded';
import ExitToAppRounded from '@material-ui/icons/ExitToAppRounded';
import LinkRounded from '@material-ui/icons/LinkRounded';
import ImageRounded from '@material-ui/icons/ImageRounded';
import OpenWithRounded from '@material-ui/icons/OpenWithRounded';

export default function FolderMenu(props) {
  const context=useContext(ContextMain)
  let options=context.getMenuOption;
  
  const getIcon = (name) => {
    const iconMap = {
      'Open': <FolderOpenRounded className="folder-menu-icon" />,
      'Rename': <EditRounded className="folder-menu-icon" />,
      'Cut': <OpenWithRounded className="folder-menu-icon" />,
      'Copy': <FileCopyRounded className="folder-menu-icon" />,
      'Share': <LinkRounded className="folder-menu-icon" />,
      'Edit Logo': <ImageRounded className="folder-menu-icon" />,
      'Delete': <DeleteRounded className="folder-menu-icon folder-menu-icon-danger" />,
      'Download': <GetAppRounded className="folder-menu-icon" />,
      'Properties': <InfoRounded className="folder-menu-icon" />,
      'New Folder': <CreateNewFolderRounded className="folder-menu-icon" />,
      'Upload File': <PublishRounded className="folder-menu-icon" />,
  'Paste': <FileCopyRounded className="folder-menu-icon" />,
  'Paste (Copy)': <FileCopyRounded className="folder-menu-icon" />,
  'Paste (Move)': <FileCopyRounded className="folder-menu-icon" />,
      'Previous': <ArrowBackRounded className="folder-menu-icon" />,
      'Refresh': <RefreshRounded className="folder-menu-icon" />,
      'Edit Profile': <PersonRounded className="folder-menu-icon" />,
      'Logout': <ExitToAppRounded className="folder-menu-icon folder-menu-icon-danger" />
    };
    return iconMap[name] || <FolderOpenRounded className="folder-menu-icon" />;
  };
  
  return (
    <div className="folder-menu" style={{left:props.x,top:props.y}}>
        {options.map((item, index)=>{
          const isDanger = item.name === 'Delete' || item.name === 'Logout';
          return(
            <React.Fragment key={item.name}>
              <div 
                className={`folder-menu-item ${isDanger ? 'folder-menu-item-danger' : ''}`}
                onMouseDown={(e)=>{
                  e.stopPropagation();
                  e.preventDefault();
                  item.action(props.folder);
                  context.setShow(false)
                }}
              >
                {getIcon(item.name)}
                <span className="folder-menu-text">{item.name}</span>
              </div>
              {index < options.length - 1 && <div className="folder-menu-divider"></div>}
            </React.Fragment>
          )
        })
      }
    </div>
  )
}
