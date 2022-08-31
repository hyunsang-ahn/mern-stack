



import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input';
const Auth = () => {
  const isSignUp = false

  console.log('isSignUp===============',isSignUp)
  const classes = useStyles()
  const [showPassword, SetShowPassword] = useState(false)


  const handleSubmit = () => {

  }
  const handleChange = () => {

  }
  const handleShowPassword = () => {
    SetShowPassword(!showPassword)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />



        </Avatar>


        <Typography variant="h5">
          {false ? 'Sign Up' : 'Sign In'}

        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="firstName" label="First Name" handleChange={handleChange} half />

                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" value='' />


            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up ' : 'Sign In'}
          </Button>
        </form>
      </Paper>

    </Container>
  )
}

export default Auth
