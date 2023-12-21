/**
 * Event Management Controllers
 *
 * Este archivo contiene controladores para manejar operaciones relacionadas con eventos
 * en el contexto de comunidades en una aplicación.
 *
 * Controladores:
 *
 * - createEvent(req, res): Crea un nuevo evento en una comunidad.
 *   - Verifica permisos del administrador y la existencia de la comunidad y del evento.
 *
 * - acceptEvent(req, res): Permite a un usuario unirse a un evento existente.
 *   - Verifica existencia del usuario y del evento, y pertenencia a la comunidad.
 *
 * - editEvent(req, res): Edita los detalles de un evento existente.
 *   - Requiere permisos de administrador de la comunidad correspondiente.
 *
 * - deleteEvent(req, res): Elimina un evento existente.
 *   - Requiere permisos de administrador de la comunidad.
 *
 * - deleteUserFromEvent(req, res): Elimina un usuario de un evento.
 *   - Requiere permisos de administrador de la comunidad.
 *
 * - exitFromEvent(req, res): Permite a un usuario salir de un evento.
 *   - Verifica pertenencia del usuario al evento y a la comunidad.
 *
 * - getEvents(req, res): Obtiene todos los eventos asociados a las comunidades del usuario.
 *
 * - getEvent(req, res): Obtiene los detalles de un evento específico por su ID.
 *   - Verifica la existencia del evento.
 *
 * Notas:
 * - Estos controladores interactúan con DAOs para realizar operaciones de base de datos.
 * - Incluyen validaciones para asegurar la autorización y la integridad de datos.
 */

import CommunityDAO from '../../dao/communityDAO.js'
import EventDAO from '../../dao/eventDAO.js'
import UserDAO from '../../dao/userDAO.js'

const createEvent = async (req, res) => {
  const { name, date, description, location } = req.body
  const { id } = req.params
  const eventExists = await EventDAO.findEventByField('name', name)
  const community = await CommunityDAO.findCommunityById(id)

  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }

  if (community.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: 'No tienes permiso para crear eventos' })
  }

  if (eventExists) {
    return res.status(409).json({ msg: 'El evento ya existe' })
  }

  try {
    const event = {
      name,
      date,
      description,
      location,
      community: community._id,
    }

    const newEvent = await EventDAO.createEvent(event)
    await CommunityDAO.addEvent(community._id, newEvent._id)
    res.status(201).json({ msg: 'Evento creado' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear evento', error })
  }
}

const acceptEvent = async (req, res) => {
  const { id } = req.params
  const community = await CommunityDAO.findCommunityById(id)
  const userExists = await UserDAO.findUserById(req.user._id)
  const userInCommunity = community.members.find(
    member => member.toString() === userExists._id.toString()
  )
  const eventExists = await EventDAO.findEventById(req.body.eventId)
  if (!eventExists) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  const userInEvent = eventExists.members.find(
    member => member.toString() === userExists._id.toString()
  )
  if (userInEvent) {
    return res.status(409).json({ message: 'Ya eres miembro de este evento' })
  }
  const eventInCommunity = community.events.find(
    event => event.toString() === eventExists._id.toString()
  )
  if (!eventInCommunity) {
    return res
      .status(403)
      .json({ msg: 'El evento no es parte de la comunidad' })
  }

  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }
  if (!userExists) {
    return res.status(404).json({ msg: 'El usuario no existe' })
  }
  if (!userInCommunity) {
    return res.status(403).json({ msg: 'No eres miembro de la comunidad' })
  }
  if (userExists._id.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ msg: 'No tienes permiso para unirte a este evento' })
  }

  try {
    await EventDAO.addMember(req.body.eventId, userExists._id)
    res.status(201).json({ msg: 'Inscrito al evento' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al agregar miembro', error })
  }
}

const editEvent = async (req, res) => {
  const { id, idEvent } = req.params
  const { name, date, description, location } = req.body
  const eventExists = await EventDAO.findEventById(idEvent)
  const community = await CommunityDAO.findCommunityById(id)
  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }
  if (!eventExists) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  if (community.admin.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: 'No tienes permiso para editar eventos' })
  }
  const eventInCommunity = community.events.find(
    event => event.toString() === eventExists._id.toString()
  )
  if (!eventInCommunity) {
    return res
      .status(403)
      .json({ msg: 'El evento no es parte de la comunidad' })
  }
  try {
    const event = {
      name,
      date,
      description,
      location,
    }
    await EventDAO.updateEvent(idEvent, event)
    res.status(201).json({ msg: 'Evento editado' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al editar evento', error })
  }
}

const deleteEvent = async (req, res) => {
  const { id, idEvent } = req.params
  const eventExists = await EventDAO.findEventById(idEvent)
  const community = await CommunityDAO.findCommunityById(id)
  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }
  if (!eventExists) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  if (community.admin.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: 'No tienes permiso para eliminar eventos' })
  }
  const eventInCommunity = community.events.find(
    event => event.toString() === eventExists._id.toString()
  )
  if (!eventInCommunity) {
    return res
      .status(403)
      .json({ message: 'El evento no es parte de la comunidad' })
  }
  try {
    await EventDAO.deleteEvent(idEvent)
    await CommunityDAO.deleteEvent(id, idEvent)
    res.status(201).json({ message: 'Evento eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar evento', error })
  }
}

const deleteUserFromEvent = async (req, res) => {
  const { id, idEvent } = req.params
  const eventExists = await EventDAO.findEventById(idEvent)
  const community = await CommunityDAO.findCommunityById(id)
  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }
  if (!eventExists) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  if (community.admin.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: 'No tienes permiso para eliminar miembros' })
  }
  const eventInCommunity = community.events.find(
    event => event.toString() === eventExists._id.toString()
  )
  if (!eventInCommunity) {
    return res
      .status(403)
      .json({ message: 'El evento no es parte de la comunidad' })
  }

  const userInEvent = eventExists.members.find(
    member => member.toString() === req.body.userId
  )
  if (!userInEvent) {
    return res
      .status(409)
      .json({ message: 'El usuario no participa en este evento' })
  }

  const userInCommunity = community.members.find(
    member => member.toString() === req.body.userId
  )
  if (!userInCommunity) {
    return res
      .status(403)
      .json({ message: 'El usuario no es miembro de la comunidad' })
  }

  try {
    await EventDAO.deleteMember(idEvent, req.body.userId)
    res.status(201).json({ message: 'Miembro eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar miembro', error })
  }
}
const exitFromEvent = async (req, res) => {
  const { id, idEvent } = req.params
  const eventExists = await EventDAO.findEventById(idEvent)
  const community = await CommunityDAO.findCommunityById(id)
  if (!community) {
    return res.status(404).json({ msg: 'La comunidad no existe' })
  }
  if (!eventExists) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  const eventInCommunity = community.events.find(
    event => event.toString() === eventExists._id.toString()
  )
  if (!eventInCommunity) {
    return res
      .status(403)
      .json({ msg: 'El evento no es parte de la comunidad' })
  }
  const userInEvent = eventExists.members.find(
    member => member.toString() === req.user._id.toString()
  )
  if (!userInEvent) {
    return res.status(409).json({ msg: 'No participas en este evento' })
  }

  const userInCommunity = community.members.find(
    member => member.toString() === req.user._id.toString()
  )
  if (!userInCommunity) {
    return res.status(403).json({ msg: 'No eres miembro de la comunidad' })
  }

  try {
    await EventDAO.deleteMember(idEvent, req.user._id)
    res.status(201).json({ msg: 'Saliste del evento' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar miembro', error })
  }
}

const getEvents = async (req, res) => {
  const user = await UserDAO.findUserById(req.user._id.toString())
  try {
    const communities = await CommunityDAO.getEvents(user._id)
    const events = communities.filter(
      community => community.events.length !== 0
    )
    const eventsFiltered = events.flatMap(community =>
      community.events.map(event => ({
        communityId: community._id,
        communityName: community.name,
        eventId: event._id,
        name: event.name,
        date: event.date,
        description: event.description,
        location: event.location,
        members: event.members,
      }))
    )
    res.status(200).json(eventsFiltered)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos', error })
  }
}

const getEvent = async (req, res) => {
  const { id } = req.params

  const event = await EventDAO.findEventByIdPopulate(id)

  if (!event) {
    return res.status(404).json({ msg: 'El evento no existe' })
  }
  try {
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener evento', error })
  }
}

export {
  createEvent,
  acceptEvent,
  editEvent,
  deleteEvent,
  deleteUserFromEvent,
  exitFromEvent,
  getEvents,
  getEvent,
}
