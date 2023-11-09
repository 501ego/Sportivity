import Activity from '../models/Activity.js'

class ActivityDAO {
  static async createActivity(data) {
    const activity = new Activity(data)
    return await activity.save()
  }
  static async findActivityById(id) {
    try {
      return await Activity.findById(id)
    } catch (error) {
      return null
    }
  }
  static async findActivityByName(name) {
    try {
      return await Activity.findOne({ name })
    } catch (error) {
      return null
    }
  }
  static async deleteActivity(id) {
    return await Activity.findByIdAndDelete(id)
  }
}

export default ActivityDAO
