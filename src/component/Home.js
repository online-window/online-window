import React, { useContext, useEffect } from 'react'
import Footer from "./Footer"
import RightBar from "./RightBar"
import "../css/home.css"
import ContextMain from '../context/ContextMain'
import NewNav from './NewNav'

export default function Home() {
  const context=useContext(ContextMain)
  
  useEffect(()=>{
      context.getUserData()
      // eslint-disable-next-line
  },[])
  
  return (
    <div className='home-main' onContextMenu={(e)=>{context.handleContextMenu(e,0,1);}} >
      <header className='home-header'>
        <NewNav/>
      </header>
      
      <main className='home-content'>
        <div className='home-workspace'>
          <RightBar/>
        </div>
      </main>
      
      <footer className='home-footer'>
        <Footer/>
      </footer>
    </div>
  )
}
