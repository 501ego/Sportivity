import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: [String],
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', EventSchema)
export default Event
