import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'


//get post id




const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles()
  const [postData, setPostData] = useState({
    title: '', message: '', tags: '', selectedFile: ''
  })


  const dispatch = useDispatch()
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ currentId, ...postData, name: user?.result?.name }, navigate))

    } else {
      console.log('여기까지 정답')
      console.log(currentId)
      console.log(postData)
      console.log(user?.result?.name)
      dispatch(updatePost({ ...postData, name: user?.result?.name }))

    }
    clear()



  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '', message: '', tags: '', selectedFile: ''

    })
  }


  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          회원가입을 해주시기 바랍니다.
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >



        <Typography variant='h6'>
          {currentId ? 'Editing a Memory' : 'Creating a Memory'}
        </Typography>

        {/* <TextField
          name="creator"
          variant='outlined'
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        /> */}

        <TextField
          name="title"
          variant='outlined'
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant='outlined'
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
          name="tags"
          variant='outlined'
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />

        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

        <Button className={classes.buttonSubmit} color='primary' size="large" type="submit" fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>

      </form>
    </Paper>
  )
}

export default Form