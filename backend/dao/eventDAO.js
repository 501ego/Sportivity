import e from 'express'
import Event from '../models/Event.js'

class EventDAO {
  static async createEvent(data) {
    const event = new Event(data)
    return await event.save()
  }

  static async addMember(id, member) {
    try {
      const event = await Event.findById(id)
      event.members.push(member)
      await event.save()
    } catch (error) {
      throw new Error('Error al agregar miembro')
    }
  }

  static async deleteEvent(id) {
    try {
      await Event.findByIdAndDelete(id)
    } catch (error) {
      throw new Error('Error al eliminar evento')
    }
  }

  static async deleteMember(id, data) {
    try {
      const event = await Event.findById(id)
      event.members.pull(data)
      await event.save()
    } catch (error) {
      throw new Error('Error al eliminar miembro')
    }
  }

  static async findEventById(id) {
    try {
      return await Event.findById(id)
    } catch (error) {
      return null
    }
  }

  static async findEventByIdPopulate(id) {
    try {
      return await Event.findById(id).populate('members').populate('community')
    } catch (error) {
      return null
    }
  }

  static async findEventByField(field, value) {
    try {
      return await Event.findOne({ [field]: value })
    } catch (error) {
      return null
    }
  }
  static async updateEvent(id, data) {
    try {
      return await Event.findByIdAndUpdate(id, data, { new: true })
    } catch {
      throw new Error('Error al actualizar evento')
    }
  }
}

export default EventDAO
