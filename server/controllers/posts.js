import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

const router = express.Router();
export const getPost = async (req, res) => {
  const { id } = req.params
  console.log('req===================', req.params)
  try {


    const post = await PostMessage.findById(id)


    res.status(200).json(post)
    // console.log(posts)
    // console.log(Number(page))
    // console.log(Math.ceil(total / LIMIT))

  } catch (error) {
    res.status(404).json({ message: error.message })

  }
}


export const getPosts = async (req, res) => {
  const { page } = req.query
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await PostMessage.countDocuments({})

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)


    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) })
    // console.log(posts)
    // console.log(Number(page))
    // console.log(Math.ceil(total / LIMIT))

  } catch (error) {
    res.status(404).json({ message: error.message })

  }
}

// QUERY -> /posts?page=1 ->page 1
// PARAMS -> /posts/123 -> id =123

export const getPostsBySearch = async (req, res) => {
  // console.log('req======================', req.query)
  const { searchQuery, tags } = req.query
  try {
    const title = new RegExp(searchQuery, 'i');
    // console.log('title====================', title)
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
    // const posts = await PostMessage.find({ tags: { $in: tags.split(',') } })

    // console.log('tags====================', tags.split(','))


    res.json({ data: posts })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



export const createPosts = async (req, res) => {

  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })


  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })

  }
}


export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO POST WITH THAT ID')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

  res.json(updatedPost)
}


export const deletePost = async (req, res) => {
  const _id = req.params.id
  console.log('_id================', _id)
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO POST WITH THAT ID')
  const deletedPost = await PostMessage.findByIdAndRemove(_id)

  res.json({ message: 'postt deleted success' })

}


export const likePost = async (req, res) => {
  console.log('req.params====================', req.params)
  const { id } = req.params
  if (!req.userId) return res.json({ message: unauthenticated })



  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO POST WITH THAT ID')

  const post = await PostMessage.findById(id);
  console.log('post===================', post)
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    post.likes.push(req.userId)
  } else {

    //dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });


  res.json(updatedPost);



}


export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id)

  post.comments.push(value)

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

  res.json(updatedPost)
}

export default router;
