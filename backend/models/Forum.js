import mongoose from 'mongoose'

const ForumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },
  ],
})

const Forum = mongoose.model('Forum', ForumSchema)
export default Forum
