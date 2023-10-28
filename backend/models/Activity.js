import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
})

const Activity = mongoose.model('Activity', ActivitySchema)
export default Activity
