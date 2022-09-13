import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

const router = express.Router();
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();


    res.status(200).json(postMessages)

  } catch (error) {
    res.status(404).json({ message: error.message })

  }
}


export const createPosts = async (req, res) => {

  const post = req.body;
  const newPost = new PostMessage(post)


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


export default router;
