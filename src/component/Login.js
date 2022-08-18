import React,{useState,useRef,useContext} from 'react'
import '../css/login.css'
import ContextMain from "../context/ContextMain"
import {postRequest} from "../api/server"
import {Grid,Button,TextField} from "@material-ui/core"
export default function Login() {
    const context=useContext(ContextMain)
    const [getData,setData]=useState({'emailid':"","password":""})
    const formRef=useRef()
    const handleClick=async(e)=>{
        context.setLoading(true)
        e.preventDefault()
        let res=await postRequest("user/login",getData);
        context.setLoading(false)
        if(res.status){
            context.Alert("Login SuccessFully","success")
            window.location.href="/"
        }
        else{
            context.Alert(res.error)
        }
    }
    const setUserData=(e,type)=>{
        let obj=getData;
        obj[type]=e.currentTarget.value;
        setData(obj)
    }
  return (
    <div className='login-main-div'>
        <div className='login-sec-1'>
            <img className='login-sec-1-img' src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg" alt="..."/>
        </div>
        <div className='login-sec-2'>
            <div className='login-sec-2-main'>
                    <Grid containor>
                            <Grid xs={12} style={{margin:20}} item className="login-sec-2-grid">
                                <div class="login-sec-2-label"> Login</div>
                            </Grid>
                            <form  ref={formRef}  onSubmit={handleClick} >
                            <Grid style={{margin:20}} className="login-sec-2-grid" item xs={12}>
                                <TextField fullWidth onChange={(e)=>{setUserData(e,"emailid")}} required={true} variant="standard" label="Email Id" type="email"  />
                            </Grid>
                            <Grid style={{margin:20}} className="login-sec-2-grid" item xs={12}>
                                <TextField fullWidth variant="standard" onChange={(e)=>{setUserData(e,"password")}} required={true}  label="Password" type="password"  />
                            </Grid>
                            <Grid style={{margin:20}} className="login-sec-2-grid" item xs={12}>
                                <Button fullWidth variant="outlined" color="secondary" type="submit" >Login</Button>
                            </Grid>
                            </form>
                            <Grid style={{margin:20}} item xs={12} className="login-sec-2-grid">
                                <div class="login-sec-2-txt">
                                    If You Don't Have Account ? <span onClick={()=>{window.location.href="/signup"}} className='login-sec-2-warn'>SignUp</span>
                                </div>
                            </Grid>
                    </Grid>
            </div>
        </div>
    </div>
  )
}
