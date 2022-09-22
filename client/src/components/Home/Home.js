import React, { useState, useEffect } from 'react'

import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { getPosts, getPostsBySearch } from '../../actions/posts'

import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import Paginate from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}


const Home = () => {
  console.log('this is home============')
  const classes = useStyles()
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  const query = useQuery();
  // const history = useHistory()
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //enter
      searchPost()
    }

  }
  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))

  }

  const searchPost = () => {
    if (search.trim()) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({
        search, tags: tags.join(',')
      }))
    } else {
      history.pushState('/')
    }
  }
  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant='outlined'
                label=" Search Memories"
                fullwidth value="Test"
                onChange={(e) => (setSearch(e.target.value))}
                onKeyPress={handleKeyPress}
              >

              </TextField>
              <ChipInput
                style={{ margin: '10px' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='search tags'
                variant='outlined'
              >

              </ChipInput>
              <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">
                search
              </Button>
            </AppBar>
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