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
      type: String,
      ref: 'Activity',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rules: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moderator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    valoration: {
      type: Number,
      trim: true,
    },
    requests: [
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

const Community = mongoose.model('Community', CommunitySchema)
export default Community
