import React,{useState,useRef, useContext} from 'react'
import '../css/signup.css'
import {postRequest} from "../api/server"
import {Grid,Button,TextField} from "@material-ui/core"
import ContextMain from '../context/ContextMain'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const history = useNavigate();
    const context = useContext(ContextMain)
    const [getData, setData] = useState({emailid:"", password:"", name:""})
    const [error, setError] = useState("")
    const formRef = useRef()
    
    const handleClick = async(e) => {
        e.preventDefault()
        setError("")
        context.setLoading(true)
        
        try {
            let res = await postRequest("user/", getData);
            context.setLoading(false)
            
            if (res && res.status) {
                history("/", {replace:true});
            } else {
                const errorMsg = res?.error || "Signup failed. Please try again.";
                setError(errorMsg);
            }
        } catch (err) {
            context.setLoading(false)
            const errorMsg = "Network error. Please check your connection and try again.";
            setError(errorMsg);
        }
    }
    
    const setUserData = (e, type) => {
        const value = e.currentTarget.value;
        setData((prev) => ({ ...prev, [type]: value }));
        if (error) setError(""); // Clear error when user types
    }
    
    return (
        <div className='signup-main-div'>
            <form className='signup-sec-2' ref={formRef} onSubmit={handleClick}>
                <Grid container>
                    <Grid xs={12} item className='signup-sec-2-grid'>
                        <div className="signup-sec-2-label">Create Account</div>
                    </Grid>
                    <Grid xs={12} item className='signup-sec-2-grid' style={{ marginBottom: 16 }}>
                        <div className="signup-subtitle">Sign up to get started</div>
                    </Grid>
                    
                    {error && (
                        <Grid xs={12} item className='signup-sec-2-grid'>
                            <div className="signup-error-message">
                                {error}
                            </div>
                        </Grid>
                    )}
                    
                    <Grid style={{marginBlock: 20}} className='signup-sec-2-grid' item xs={12}>
                        <TextField 
                            fullWidth 
                            onChange={(e) => {setUserData(e,"name")}} 
                            required={true} 
                            variant="outlined" 
                            label="Name" 
                            type="text"
                            autoComplete="name"
                        />
                    </Grid>
                    <Grid style={{marginBlock: 20}} className='signup-sec-2-grid' item xs={12}>
                        <TextField 
                            fullWidth 
                            onChange={(e) => {setUserData(e,"emailid")}} 
                            required={true} 
                            variant="outlined" 
                            label="Email Id" 
                            type="email"
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid style={{marginBlock: 20}} className='signup-sec-2-grid' item xs={12}>
                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            onChange={(e) => {setUserData(e,"password")}} 
                            required={true}  
                            label="Password" 
                            type="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid style={{marginBlock: 20}} className='signup-sec-2-grid' item xs={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid style={{marginBlock: 20}} item xs={12} className='signup-sec-2-grid'>
                        <div className="signup-sec-2-txt">
                            Already have an account? {" "}
                            <span 
                                onClick={() => {history("/login", {replace:true})}} 
                                className='signup-sec-2-warn'
                            >
                                Log in
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
