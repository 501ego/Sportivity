import mongoose from 'mongoose'

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    forum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forum',
    },
    activity: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rules: {
      type: String,
      required: true,
      trim: true,
    },
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
      },
    ],
    moderator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    valoration: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Community = mongoose.model('Community', CommunitySchema)
export default Community
