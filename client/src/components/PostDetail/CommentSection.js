import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import { commentPost } from '../../actions/posts.js'
const CommentSection = ({ post }) => {
<<<<<<< HEAD
    console.log(post)
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
=======
    const classes = useStyles()
    const [comments, setComments] = useState([1, 2, 3, 4])
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
>>>>>>> 20fce58d79ffe6fbc657cd8a03354c1d1977f3c1
    console.log('user=================', user)
    const handleClick = () => {
        const finalComment = `${user.result.name} : ${comment}`
        dispatch(commentPost(finalComment, post._id))
    }
    return (
        <div>

            <div classNmae={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterButton variant="h6">Comments</Typography>
<<<<<<< HEAD
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            {c}
                        </Typography>
                    ))}
                </div>
                {/* {user?.result?.name && */}
                {user &&

=======
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            comment {i}
                        </Typography>
                    ))}
                </div>
                {user &&
>>>>>>> 20fce58d79ffe6fbc657cd8a03354c1d1977f3c1
                    (<div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>
                            Write a Comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                            Comment

                        </Button>
                    </div>)


                }

            </div>

        </div>
    )
}

export default CommentSection