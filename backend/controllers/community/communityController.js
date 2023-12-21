/**
 * Community Controller
 *
 * Este archivo contiene funciones para manejar operaciones relacionadas con comunidades
 * en una aplicación de red social o similar.
 *
 * Funciones:
 *
 * - createCommunity(req, res): Crea una nueva comunidad.
 *   - Verifica existencia de comunidad, validez del usuario y de la actividad asociada.
 *
 * - getMyCommunity(req, res): Obtiene las comunidades del usuario actual.
 *
 * - getCommunityById(req, res): Obtiene detalles de una comunidad específica por ID.
 *
 * - getCommunities(req, res): Lista todas las comunidades disponibles.
 *
 * - editCommunity(req, res): Edita una comunidad existente.
 *   - Solo permitido por el administrador de la comunidad.
 *
 * - deleteCommunity(req, res): Elimina una comunidad existente.
 *   - Solo permitido por el administrador de la comunidad.
 *
 * - addMember(req, res): Agrega un miembro a una comunidad.
 *   - Requiere permisos de administrador o moderador.
 *
 * - deleteMember(req, res): Elimina un miembro de una comunidad.
 *   - Requiere permisos de administrador o moderador.
 *
 * - exitCommunity(req, res): Permite a un usuario salir de una comunidad.
 *
 * - sendRequest(req, res): Envía una solicitud para unirse a una comunidad.
 *
 * - getRequests(req, res): Obtiene solicitudes de unión pendientes para las comunidades del usuario.
 *   - Solo visible para administradores.
 *
 * - addModerator(req, res): Asigna un moderador en una comunidad.
 *   - Solo permitido por el administrador de la comunidad.
 *
 * - deleteModerator(req, res): Elimina un moderador de una comunidad.
 *   - Solo permitido por el administrador de la comunidad.
 *
 * - getCommunityByName(req, res): Busca comunidades por nombre.
 *
 * Notas:
 * - Las funciones están diseñadas para trabajar con un sistema de base de datos a través de DAOs.
 * - Manejan la autenticación, autorización, y validaciones de datos.
 */

import UserDAO from '../../dao/userDAO.js'
import CommunityDAO from '../../dao/communityDAO.js'
import ActivityDAO from '../../dao/activityDAO.js'

const createCommunity = async (req, res) => {
  const { name, activity } = req.body
  const communityExist = await CommunityDAO.findCommunityByField('name', name)
  const userAdmin = req.user._id.toString()
  const userIsValidated = await UserDAO.findUserById(userAdmin)
  const activityExist = await ActivityDAO.findActivityByName(activity)
  if (!activityExist) {
    return res.status(400).json({ msg: 'La actividad no existe' })
  }
  if (!userIsValidated.isValidated) {
    return res
      .status(400)
      .json({ msg: 'Debes validar tu usuario para poder crear una comunidad' })
  } else if (communityExist) {
    return res.status(400).json({ msg: 'Nombre de comunidad no disponible' })
  } else {
    try {
      await CommunityDAO.createCommunity(
        req.body,
        userAdmin,
        activityExist.name
      )
      return res.status(201).json({
        msg: 'Comunidad creada correctamente',
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const getMyCommunity = async (req, res) => {
  const user = req.user._id.toString()
  const userExist = await UserDAO.findUserById(user)
  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  try {
    const communities = await CommunityDAO.getMyCommunities(user)
    return res.status(200).json(communities)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getCommunityById = async (req, res) => {
  const { id } = req.params
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  try {
    const admin = await UserDAO.findUserById(communityExist.admin.toString())
    const community = {
      ...communityExist._doc,
      admin: `${admin.name} ${admin.lastName}`,
    }
    return res.status(200).json(community)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getCommunities = async (req, res) => {
  try {
    const communities = await CommunityDAO.getAllCommunities()
    return res.json(communities)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const editCommunity = async (req, res) => {
  const { id } = req.params
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (communityExist.admin.toString() !== req.user._id.toString()) {
    return res.status(400).json({ msg: 'No tienes permiso para editar' })
  }
  try {
    const updateFields = {
      name: req.body.name,
      description: req.body.description,
      rules: req.body.rules,
      //TODO add image
    }
    const updatedCommunity = await CommunityDAO.updateCommunity(
      id,
      updateFields
    )
    if (!updatedCommunity) {
      return res.status(500).json({ msg: 'Error al actualizar la comunidad' })
    }
    return res.status(200).json({ msg: 'Comunidad editada' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const deleteCommunity = async (req, res) => {
  const { id } = req.params
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (communityExist.admin.toString() !== req.user._id.toString()) {
    return res.status(400).json({ msg: 'No tienes permiso para eliminar' })
  }
  try {
    await CommunityDAO.deleteCommunity(id)
    return res.status(200).json({ msg: 'Comunidad eliminada' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const addMember = async (req, res) => {
  const { id } = req.params
  const userAdminorMod = req.user._id.toString()
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (
    communityExist.admin.toString() !== userAdminorMod &&
    !communityExist.moderator.some(
      moderator => moderator.toString() === userAdminorMod
    )
  ) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para agregar miembro' })
  }
  const userToAdd = await UserDAO.findUserById(req.body.user)
  if (!userToAdd) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  if (communityExist.members.includes(userToAdd._id)) {
    return res.status(400).json({ msg: 'El usuario ya es miembro' })
  }

  if (userToAdd._id.toString() === communityExist.admin.toString()) {
    return res
      .status(400)
      .json({ msg: 'El usuario es administrador de la comunidad' })
  }

  try {
    await CommunityDAO.addMember(id, userToAdd._id)
    //TODO send notification to user aceptado -- Revisar nuevamente el add de la comunidad al user
    const updateData = {
      $push: { community: id },
    }
    await UserDAO.updateUser(userToAdd._id, updateData)
    await CommunityDAO.deleteRequest(id, userToAdd._id)
    return res.status(200).json({ msg: 'Miembro agregado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const deleteMember = async (req, res) => {
  const { id } = req.params
  const userAdminorMod = req.user._id.toString()
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  const userToDelete = await UserDAO.findUserById(req.body)
  const userId = userToDelete._id.toString()

  if (
    communityExist.moderator.some(
      moderator => moderator.toString() === userId
    ) &&
    communityExist.moderator.some(
      moderator => moderator.toString() === userAdminorMod
    )
  ) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para eliminar a un miembro moderador' })
  }
  if (
    communityExist.admin.toString() !== userAdminorMod &&
    !communityExist.moderator.some(
      moderator => moderator.toString() === userAdminorMod
    )
  ) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para eliminar miembro' })
  }
  if (!userToDelete) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  if (!communityExist.members.includes(userId)) {
    return res.status(400).json({ msg: 'El usuario no es miembro' })
  }
  try {
    await CommunityDAO.deleteMember(id, userId)
    const communityId = userToDelete.community.find(
      community => community.toString() === id
    )

    // Verifica si la comunidad existe en el array del usuario.
    if (communityId) {
      await UserDAO.deleteUserCommunity(userId, communityId)
    }

    if (
      communityExist.moderator.some(
        moderator => moderator.toString() === userId
      )
    ) {
      await CommunityDAO.deleteModerator(id, userId)
    }
    //TODO eliminar miembro del evento
    //TODO send notification to user eliminado
    return res.status(200).json({ msg: 'Miembro eliminado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const exitCommunity = async (req, res) => {
  const { id } = req.params
  const user = req.user._id.toString()
  const userToDelete = await UserDAO.findUserById(user)
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (!communityExist.members.includes(user)) {
    return res.status(400).json({ msg: 'No eres miembro de la comunidad' })
  }
  try {
    await CommunityDAO.deleteMember(id, user)
    if (
      communityExist.moderator.some(moderator => moderator.toString() === user)
    ) {
      await CommunityDAO.deleteModerator(id, user)
    }
    const communityId = userToDelete.community.find(
      community => community.toString() === id
    )
    if (communityId) {
      await UserDAO.deleteUserCommunity(user, communityId)
    }
    //TODO send notification to user eliminado
    return res.status(200).json({ msg: 'Miembro eliminado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const sendRequest = async (req, res) => {
  const { id } = req.params
  const user = req.user._id.toString()
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }

  if (communityExist.members.includes(user)) {
    return res.status(400).json({ msg: 'Ya eres miembro de la comunidad' })
  }

  if (communityExist.requests.includes(user)) {
    return res.status(400).json({ msg: 'Ya has enviado una solicitud' })
  }
  try {
    await CommunityDAO.sendingRequest(id, user)
    return res
      .status(200)
      .json({ msg: 'Solicitud enviada', communityId: id, userId: user })
  } catch (error) {
    //TODO send notification to admin and mods
    return res
      .status(500)
      .json({ msg: 'Hubo un problema al enviar la solicitud' })
  }
  //TODO ver cómo el admin o el mod reciben la solicitud con la id del miembro 8==3
}

const getRequests = async (req, res) => {
  const userAdmin = req.user._id.toString()
  const userExist = await UserDAO.findUserById(userAdmin)
  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  try {
    const communityExist = await CommunityDAO.getMyRequest(userExist._id)

    if (
      communityExist.some(
        community => community.admin._id.toString() !== userExist._id.toString()
      )
    ) {
      return res
        .status(400)
        .json({ msg: 'No tienes permiso para ver solicitudes' })
    }
    //console.log(communityExist.filter(community => community.requests.length !== 0))
    const myRequests = communityExist.filter(
      community => community.requests.length !== 0
    )
    const myRequestsFilter = myRequests.flatMap(community =>
      community.requests.map(request => ({
        communityId: community._id,
        communityName: community.name,
        name: request.name,
        lastName: request.lastName,
        userId: request._id,
      }))
    )
    return res.status(200).json(myRequestsFilter)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const addModerator = async (req, res) => {
  const { id } = req.params
  const userAdmin = req.user._id.toString()
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (communityExist.admin.toString() !== userAdmin) {
    return res.status(400).json({ msg: 'No tienes permiso para agregar mod' })
  }
  const { _id } = req.body
  const userToAddExist = await UserDAO.findUserById(_id)
  const userToAdd = userToAddExist._id.toString()
  if (!userToAddExist) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }

  if (
    communityExist.moderator.some(
      moderator => moderator.toString() === userToAdd
    )
  ) {
    return res.status(400).json({ msg: 'El usuario ya es moderador' })
  }

  if (
    !communityExist.members.some(members => members.toString() === userToAdd)
  ) {
    return res.status(400).json({ msg: 'El usuario no es miembro' })
  }
  try {
    await CommunityDAO.addModerator(id, userToAdd)
    //TODO send notification to user mod
    return res.status(200).json({ msg: 'Moderador agregado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const deleteModerator = async (req, res) => {
  const { id } = req.params
  const userAdmin = req.user._id.toString()
  const communityExist = await CommunityDAO.findCommunityById(id)
  if (!communityExist) {
    return res.status(400).json({ msg: 'La comunidad no existe' })
  }
  if (communityExist.admin.toString() !== userAdmin) {
    return res.status(400).json({ msg: 'No tienes permiso para eliminar mod' })
  }
  const { _id } = req.body
  const userToDeleteExist = await UserDAO.findUserById(_id)
  const userToDelete = userToDeleteExist._id.toString()
  if (!userToDeleteExist) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  if (
    !communityExist.moderator.some(
      moderator => moderator.toString() === userToDelete
    )
  ) {
    return res.status(400).json({ msg: 'El usuario no es moderador' })
  }
  try {
    await CommunityDAO.deleteModerator(id, userToDelete)
    //TODO send notification to user mod
    return res.status(200).json({ msg: 'Moderador eliminado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}
const getCommunityByName = async (req, res) => {
  const { name } = req.params

  try {
    const allCommunities = await CommunityDAO.getAllCommunities()

    if (!name.trim()) {
      return res.status(200).json(allCommunities)
    }

    const filteredCommunities = allCommunities.filter(community =>
      community.name.toLowerCase().includes(name.toLowerCase())
    )

    if (filteredCommunities.length === 0) {
      return res
        .status(404)
        .json({ msg: 'No se encontraron comunidades con ese nombre' })
    }

    return res.status(200).json(filteredCommunities)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

export {
  createCommunity,
  editCommunity,
  deleteCommunity,
  addMember,
  sendRequest,
  deleteMember,
  exitCommunity,
  addModerator,
  deleteModerator,
  getCommunities,
  getMyCommunity,
  getCommunityById,
  getCommunityByName,
  getRequests,
}
