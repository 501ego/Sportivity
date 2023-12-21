import mongoose from 'mongoose'

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
})

const Thread = mongoose.model('Thread', ThreadSchema)
export default Thread
