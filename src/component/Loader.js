import React, { useContext } from 'react';
import ContextMain from "../context/ContextMain"
import { TailSpin } from  'react-loader-spinner'
import "../css/loader.css"

export default function Loader() {
    const context=useContext(ContextMain)
    
    return (
        context.loading && (
            <div className='loader-overlay'>
                <div className='loader-container'>
                    <div className='loader-spinner'>
                        <TailSpin 
                            color="#667eea" 
                            height={80} 
                            width={80}
                            ariaLabel="Loading"
                        />
                    </div>
                    <div className='loader-text'>Loading...</div>
                    <div className='loader-dots'>
                        <span className='loader-dot'></span>
                        <span className='loader-dot'></span>
                        <span className='loader-dot'></span>
                    </div>
                </div>
            </div>
        )
    );
}
