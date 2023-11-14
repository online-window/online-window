import React, { useContext, useEffect } from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import LeftBar from "./LeftBar"
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
      <div className='home-head' >
      <NewNav/>
      </div>
      <div className='home-middle'>
        <div className='home-right'>
      <RightBar/>
        </div>
      </div>
      <div className='home-last'>
      <Footer/>
      </div>
      </div>
  )
}
