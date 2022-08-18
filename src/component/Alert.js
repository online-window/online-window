import React from 'react';
import "../css/alert.css";
export default function Alert(props) {
    var color="rgba(255,0,0,0.8)";
    if(props.type==="success"){
        color="rgba(0,255,0,0.8)";
    }
    else if(props.type==="warning"){
        color="rgba(255,255,0,0.8)"
    }
    // alert(color)
  return (
    <div style={{backgroundColor:color}} className='alert'>
        {props.msg}
    </div>
  )
}
