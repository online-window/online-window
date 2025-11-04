import React from 'react';
import "../css/alert.css";
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import ErrorRounded from '@material-ui/icons/ErrorRounded';
import WarningRounded from '@material-ui/icons/WarningRounded';

export default function Alert(props) {
    const getIcon = () => {
        if(props.type === "success"){
            return <CheckCircleRounded className='alert-icon' />;
        }
        else if(props.type === "warning"){
            return <WarningRounded className='alert-icon' />;
        }
        return <ErrorRounded className='alert-icon' />;
    }

    return (
        <div className={`alert alert-${props.type}`}>
            <div className='alert-content'>
                {getIcon()}
                <span className='alert-message'>{props.msg}</span>
            </div>
            <div className='alert-progress'></div>
        </div>
    )
}
