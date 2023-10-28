import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Perfil', ProfileSchema)
export default Profile
