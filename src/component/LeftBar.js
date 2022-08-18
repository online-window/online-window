import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'

export default function LeftBar() {
  const context=useContext(ContextMain)
  return (
    <div onContextMenu={context.handleContextMenu}>
      LeftBar</div>
  )
}
