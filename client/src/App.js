import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material/';
import memories from './images/memories.png'
function App() {
  return (
    <Container maxWidth='lg'>
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>Memories</Typography>
        <img src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={7}>
              {/* <Posts /> */}
            </Grid>
            <Grid item xs={12} sm={7}>
              {/* <Form /> */}

            </Grid>

          </Grid>

        </Container>
      </Grow>
    </Container>
  )
}

export default App