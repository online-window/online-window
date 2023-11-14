import React, { useState, useRef, useContext } from "react";
import "../css/login.css";
import ContextMain from "../context/ContextMain";
import { postRequest } from "../api/server";
import { Grid, Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router";
export default function Login() {
  const context = useContext(ContextMain);
  const history = useNavigate();
  const [getData, setData] = useState({ emailid: "", password: "" });
  const formRef = useRef();
  const handleClick = async (e) => {
    context.setLoading(true);
    e.preventDefault();
    let res = await postRequest("user/login", getData);
    context.setLoading(false);
    if (res.status) {
      context.Alert("Login SuccessFully", "success");
      history("/", { replace: true });
    } else {
      context.Alert(res.error);
    }
  };
  const setUserData = (e, type) => {
    let obj = getData;
    obj[type] = e.currentTarget.value;
    setData(obj);
  };
  return (
    <div className="login-main-div">
      <form className="login-sec-2" ref={formRef} onSubmit={handleClick}>
        <Grid containor>
          <Grid
            xs={12}
            style={{ margin: 20 }}
            item
            className="login-sec-2-grid"
          >
            <div class="login-sec-2-label"> Login</div>
          </Grid>
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
              variant="standard"
              label="Email Id"
              type="email"
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
              variant="standard"
              onChange={(e) => {
                setUserData(e, "password");
              }}
              required={true}
              label="Password"
              type="password"
            />
          </Grid>
          <Grid
            style={{ marginBlock: 30 }}
            className="login-sec-2-grid"
            item
            xs={12}
          >
            <Button fullWidth variant="outlined" color="primary" type="submit">
              Login
            </Button>
          </Grid>
          <Grid
            style={{ marginBlock: 30 }}
            item
            xs={12}
            className="login-sec-2-grid"
          >
            <div class="login-sec-2-txt">
              If You Don't Have Account ?{" "}
              <span
                onClick={() => {
                  history("/signup", { replace: true });
                }}
                className="login-sec-2-warn"
              >
                SignUp
              </span>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
