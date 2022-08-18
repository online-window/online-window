import React, { useContext } from 'react'
import ContextMain from '../context/ContextMain'
import {Grid,TextField} from "@material-ui/core"
export default function AccessLink() {
    const context=useContext(ContextMain)
  return (
    <div>
        <div>
            <div>
                <TextField variant='standard' label='User Email Id'/>
            </div>
            <div>
                
            </div>
        </div>
        <div>

        </div>
        <div>

        </div>
    </div>
  )
}
