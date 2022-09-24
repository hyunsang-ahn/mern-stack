import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/')
    setUser(null)
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log('user================', user)
    if (token) {
      const decodedToken = decode(token)
      console.log('decodedToken==============', decodedToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        //특정 시간 이후 바로 로그아웃
        logout()
      }

    }
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      {/* <div className={classes.brandContainer}> */}
      {/* <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography> */}
      <Link to="/" className={classes.appBar} position="static" color="inherit">
        <img src={memoriesText} alt="icon" height="60px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="45px"
        />
      </Link>

      {/* </div> */}
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.given_name}
              src={user.picture}
            >
              {user.result.name[0].toUpperCase()}

            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
