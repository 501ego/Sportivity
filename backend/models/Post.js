import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  like: {
    type: Boolean,
  },
})

const Post = mongoose.model('Post', PostSchema)
export default Post
