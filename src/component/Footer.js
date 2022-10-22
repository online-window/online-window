import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import "../css/footer.css"
export default function Footer() {
  const context=useContext(ContextMain)
  return (
    <div className='footer-main'  >
        {context.getFolders.length} items ({Math.round(context.getCurrSpace*100)/100} MB) 
    </div>
  )
}
