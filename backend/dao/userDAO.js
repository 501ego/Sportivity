import User from '../models/User.js'
import generateId from '../helpers/generateId.js'

class UserDAO {
  static async findUserByField(field, value) {
    try {
      return await User.findOne({ [field]: value })
    } catch (error) {
      return null
    }
  }

  static async findUserById(id) {
    try {
      return await User.findById(id)
    } catch (error) {
      return null
    }
  }

  static async findUserByCredentials(email, userName) {
    try {
      return (
        (await User.findOne({ email })) || (await User.findOne({ userName }))
      )
    } catch (error) {
      return null
    }
  }

  static async createUser(data) {
    const user = new User(data)
    user.token = generateId()
    return await user.save()
  }

  static async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
  }

  static async verifyPassword(user, password) {
    return await user.verifyPassword(password)
  }

  static async makeUserMod(user) {
    user.isMod = true
    await user.save()
  }

  static async confirmUserEmail(user) {
    user.confirmedEmail = true
    user.token = ''
    await user.save()
  }

  static async updateUserPasswordAndResetToken(user, newPassword) {
    user.password = newPassword
    user.token = ''
    await user.save()
  }

  static async updateUserToken(user, newToken) {
    return await User.findByIdAndUpdate(
      user._id,
      { token: newToken },
      { new: true }
    )
  }
}

export default UserDAO
