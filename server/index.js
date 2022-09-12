import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express()
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

// const CONNETION_URL = 'mongodb+srv://admin:ReW86vMoeO7nhltT@cluster0.avuqeyr.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNETION_URL,
  {
    //useNewUrlParser: true,  // <-- no longer necessary
    //useUnifiedTopology: true  // <-- no longer necessary
  }

)
  .then(() => app.listen(PORT, () => console.log(`server running ${PORT}`)))
  .catch((error) => console.log(error.message))



//mongoose.set('useFindAndModify', false) // <-- no longer necessary



