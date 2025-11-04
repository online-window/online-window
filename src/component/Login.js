import React, { useState, useRef, useContext } from "react";
import "../css/login.css";
import ContextMain from "../context/ContextMain";
import { postRequest } from "../api/server";
import { Grid, Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const context = useContext(ContextMain);
  const history = useNavigate();
  const [getData, setData] = useState({ emailid: "", password: "" });
  const [error, setError] = useState("");
  const formRef = useRef();
  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    context.setLoading(true);
    
    try {
      let res = await postRequest("user/login", getData);
      context.setLoading(false);
      
      if (res && res.status) {
        history("/", { replace: true });
      } else {
        const errorMsg = res?.error || "Login failed. Please check your credentials.";
        setError(errorMsg);
      }
    } catch (err) {
      context.setLoading(false);
      const errorMsg = "Network error. Please check your connection and try again.";
      setError(errorMsg);
    }
  };
  const setUserData = (e, type) => {
    const value = e.currentTarget.value;
    setData((prev) => ({ ...prev, [type]: value }));
    if (error) setError(""); // Clear error when user types
  };
  return (
    <div className="login-main-div">
      <form className="login-sec-2" ref={formRef} onSubmit={handleClick}>
        <Grid container>
          <Grid xs={12} item className="login-sec-2-grid">
            <div className="login-sec-2-label">Welcome Back</div>
          </Grid>
          <Grid xs={12} item className="login-sec-2-grid" style={{ marginBottom: 20 }}>
            <div className="login-subtitle">Sign in to your account</div>
          </Grid>
          
          {error && (
            <Grid xs={12} item className="login-sec-2-grid">
              <div className="login-error-message">
                {error}
              </div>
            </Grid>
          )}
          
          <Grid
            style={{ marginBlock: 30 }}
            className="login-sec-2-grid"
            item
            xs={12}
          >
            <TextField
              fullWidth
              onChange={(e) => {
                setUserData(e, "emailid");
              }}
              required={true}
              variant="outlined"
              label="Email Id"
              type="email"
              autoComplete="username"
            />
          </Grid>
          <Grid
            style={{ marginBlock: 30 }}
            className="login-sec-2-grid"
            item
            xs={12}
          >
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setUserData(e, "password");
              }}
              required={true}
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid
            style={{ marginBlock: 30 }}
            className="login-sec-2-grid"
            item
            xs={12}
          >
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Grid>
          <Grid
            style={{ marginBlock: 30 }}
            item
            xs={12}
            className="login-sec-2-grid"
          >
            <div className="login-sec-2-txt">
              Don't have an account? {" "}
              <span
                onClick={() => {
                  history("/signup", { replace: true });
                }}
                className="login-sec-2-warn"
              >
                Sign up
              </span>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
