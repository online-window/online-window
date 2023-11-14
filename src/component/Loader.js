import React, { useContext } from 'react';
import ContextMain from "../context/ContextMain"
import { TailSpin } from  'react-loader-spinner'
import "../css/loader.css"

export default function Loader() {

    const context=useContext(ContextMain)
  return (
    context.loading && <div className='loader'>
     <TailSpin color="#00BFFF"  height={100} width={100}  />
    </div>
  );
}
