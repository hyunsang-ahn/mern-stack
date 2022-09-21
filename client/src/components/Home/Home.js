import React, { useState, useEffect } from 'react'

import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import { Container, AppBar, Typography, Grow, Grid, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import Paginate from '../Pagination';
const Home = () => {
  console.log('this is home============')
  const classes = useStyles()
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.paginztion} elevation={6}>
              <Paginate />
            </Paper>
          </Grid>

        </Grid>

      </Container>
    </Grow>
  )
}

export default Home