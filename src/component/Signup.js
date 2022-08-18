import React,{useState,useRef, useContext} from 'react'
import '../css/signup.css'
import {postRequest} from "../api/server"
import {Grid,Button,TextField} from "@material-ui/core"
import ContextMain from '../context/ContextMain'
export default function Signup() {
    const context=useContext(ContextMain)
    const [getData,setData]=useState({'emailid':"","password":"","name":""})
    const formRef=useRef()
    const handleClick=async(e)=>{
        context.setLoading(true)
        e.preventDefault()
        let res=await postRequest("user/",getData);
        context.setLoading(false)
        if(res.status){
            context.Alert("SignUp SuccessFully","success")
            window.location.href="/"
        }
        else{
            alert(res.error)
        }
    }
    const setUserData=(e,type)=>{
        let obj=getData;
        obj[type]=e.currentTarget.value;
        setData(obj)
    }
  return (
    <div className='signup-main-div'>
        <div className='signup-sec-2'>
            <div className='signup-sec-2-main'>
                    <Grid containor >
                            <Grid style={{margin:20}} xs={12} item>
                                <div class="signup-sec-2-label"> Signup</div>
                            </Grid>
                            <form ref={formRef} onSubmit={handleClick} >
                            <Grid style={{margin:20}} item xs={12}>
                                <TextField  fullWidth onChange={(e)=>{setUserData(e,"name")}} required={true} variant="standard" label="Name" type="text"  />
                            </Grid>
                            <Grid style={{margin:20}} item xs={12}>
                                <TextField fullWidth onChange={(e)=>{setUserData(e,"emailid")}} required={true} variant="standard" label="Email Id" type="email"  />
                            </Grid>
                            <Grid style={{margin:20}} item xs={12}>
                                <TextField fullWidth variant="standard" onChange={(e)=>{setUserData(e,"password")}} required={true}  label="Password" type="password"  />
                            </Grid>
                            <Grid style={{margin:20}} item xs={12}>
                                <Button fullWidth variant="outlined" color="secondary" type="submit" >Signup</Button>
                            </Grid>
                            </form>
                            <Grid style={{margin:20}} item xs={12}>
                                <div class="signup-sec-2-txt">
                                    If You Already Have Account ? <span onClick={()=>{window.location.href="/login"}} className='signup-sec-2-warn'>Login</span>
                                </div>
                            </Grid>
                    </Grid>
            </div>
        </div>
        <div className='signup-sec-1'>
            <img className='signup-sec-1-img' src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg" alt="..."/>
        </div>
    </div>
  )
}
