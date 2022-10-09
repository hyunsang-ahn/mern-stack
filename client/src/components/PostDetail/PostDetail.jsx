import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

<<<<<<< HEAD
import { getPost, getPostsBySearch } from '../../actions/posts'
=======
import { getPost } from '../../actions/posts'
>>>>>>> 5238d237f52a0c76b87e2a83e19fec7c4e85d617
import moment from 'moment'
import useStyles from './styles'
function PostDetail() {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id))

    }, [id])

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }
    }, [post])
    console.log('post detail id=====================', id)
    console.log('post detail isLoading=====================', isLoading)
    console.log('post detail posts=====================', posts)
    console.log('post detail posts=====================', post)

    if (!posts) return null;
    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />

            </Paper>
        )

    }

    const recommendedPosts = posts.filter(({ _id }) => _id === post._id)

    return (
        <Paper>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length && (<div className={classes.section}>
                <Typography gutterButton variant='h5'>you might also like : </Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                        <div>
                            {title}
                        </div>
                    ))}
                </div>

            </div>)}
        </Paper>
    )
}

export default PostDetail