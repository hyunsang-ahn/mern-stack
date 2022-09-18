import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { signin, signup } from '../../actions/auth'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const Auth = () => {

  const classes = useStyles();
  const [showPassword, SetShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useLocation()
  const dispatch = useDispatch();
  const clientId =
    "66618411565-2j4jhti4j7skhnql19rsvbs2fk9uvhkc.apps.googleusercontent.com";
  // v6
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData, [e.target.name]: e.target.value
    })

  };
  const handleShowPassword = () => {
    SetShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    SetShowPassword(false)
  };

  const createOrGetUser = (response) => {
    //증명 json web token
    const decoded = jwt_decode(response.credential);
    console.log(decoded);
    //jti가 토큰임           decoded.jti
    try {
      dispatch({ type: "AUTH", data: decoded });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{false ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              value=""
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up " : "Sign In"}
          </Button>

          <GoogleLogin
            onSuccess={(res) => {
              createOrGetUser(res);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          // useOneTap
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "로그인" : "회원가입"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
