import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import { commentPost } from '../../actions/posts.js'
const CommentSection = ({ post }) => {
    console.log(post)
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
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
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            {c}
                        </Typography>
                    ))}
                </div>
                {/* {user?.result?.name && */}
                {user &&

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