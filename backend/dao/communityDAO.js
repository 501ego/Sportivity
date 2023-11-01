import { sendRequest } from '../controllers/community/communityController.js'
import Community from '../models/Community.js'

class CommunityDAO {
  static async findCommunityByField(field, value) {
    try {
      return await Community.findOne({ [field]: value })
    } catch (error) {
      return null
    }
  }

  static async findCommunityById(id) {
    try {
      return await Community.findById(id)
    } catch (error) {
      return null
    }
  }

  static async createCommunity(data, admin) {
    const community = new Community(data)
    community.admin = admin
    return await community.save()
  }
  static async updateCommunity(id, data) {
    return await Community.findByIdAndUpdate(id, data, { new: true })
  }
  static async deleteCommunity(id) {
    return await Community.findByIdAndDelete(id)
  }
  static async addMember(id, member) {
    try {
      const community = await Community.findById(id)
      community.members.push(member)
      await community.save()
    } catch (error) {
      throw new Error('Error al enviar la solicitud')
    }
  }
  static async sendingRequest(communityId, userId) {
    try {
      return await Community.findByIdAndUpdate(
        communityId,
        { $push: { requests: userId } },
        { new: true }
      )
    } catch (error) {
      throw new Error('Error al enviar la solicitud')
    }
  }
}

export default CommunityDAO
