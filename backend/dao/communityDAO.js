import Community from '../models/Community.js'

class CommunityDAO {

  static async getEvents(id) {
    try {
      return await Community.find({
        $or: [{ admin: id }, { moderator: id }, { members: id }],
      })
        .populate('events')
      
    } catch (error) {
      return null
    }
  }
  
  static async getMyRequest(id) {
    try {
      return await Community.find({
        $or: [{ admin: id }, { moderator: id }],
      })
        .populate('requests')
        .populate('admin')
      
    } catch (error) {
      return null
    }
  }

  static async deleteRequest(id, userId) {
    try {
      const community = await Community.findById(id)
      community.requests = community.requests.filter(
        (request) => request._id.toString() !== userId
      )
      await community.save()
    } catch (error) {
      return null
    }
  }

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

  static async getMyCommunities(id) {
    try {
      return await Community.find({
        $or: [{ admin: id }, { members: id }, { moderator: id }],
      })
    } catch (error) {
      return null
    }
  }

  static async getAllCommunities() {
    try {
      return await Community.find()
    } catch (error) {
      return null
    }
  }

  static async createCommunity(data, admin, activity) {
    try {
      const community = new Community(data)
      community.admin = admin
      community.activity = activity
      return await community.save()
    } catch (error) {
      throw new Error('Error al crear comunidad')
    }
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
  static async deleteMember(id, data) {
    try {
      const community = await Community.findById(id)
      community.members.pull(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al eliminar miembro')
    }
  }
  static async deleteRequest(id, data) {
    try {
      const community = await Community.findById(id)
      community.requests.pull(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al eliminar solicitud')
    }
  }
  static async addModerator(id, data) {
    try {
      const community = await Community.findById(id)
      community.moderator.push(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al agregar moderador')
    }
  }
  static async deleteModerator(id, data) {
    try {
      const community = await Community.findById(id)
      community.moderator.pull(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al eliminar moderador')
    }
  }
  static async addEvent(id, data) {
    try {
      const community = await Community.findById(id)
      community.events.push(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al agregar evento')
    }
  }
  static async deleteEvent(id, data) {
    try {
      const community = await Community.findById(id)
      community.events.pull(data)
      await community.save()
    } catch (error) {
      throw new Error('Error al eliminar evento')
    }
  }
}

export default CommunityDAO
