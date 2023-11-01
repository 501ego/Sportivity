import UserDAO from '../../dao/userDAO.js'
import CommunityDAO from '../../dao/communityDAO.js'

const createCommunity = async (req, res) => {
  const { name } = req.body
  const communityExist = await CommunityDAO.findCommunityByField('name', name)
  const userAdmin = req.user._id.toString()
  const userIsValidated = await UserDAO.findUserById(userAdmin)
  if (!userIsValidated.isValidated) {
    return res
      .status(400)
      .json({ msg: 'Debes validar tu usuario para poder crear una comunidad' })
  } else if (communityExist) {
    return res.status(400).json({ msg: 'Nombre de comunidad no disponible' })
  } else {
    try {
      await CommunityDAO.createCommunity(req.body, userAdmin)
      return res.status(201).json({
        msg: 'Comunidad creada correctamente',
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
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
  console.log(
    communityExist.moderator.some(
      moderator => moderator._id.toString() === userAdminorMod
    )
  )

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
  const userToAdd = await UserDAO.findUserById(req.body)
  console.log(userToAdd)
  console.log(userToAdd)
  if (!userToAdd) {
    return res.status(400).json({ msg: 'El usuario no existe' })
  }
  if (communityExist.members.includes(userToAdd._id)) {
    return res.status(400).json({ msg: 'El usuario ya es miembro' })
  }
  try {
    await CommunityDAO.addMember(id, userToAdd._id)
    //TODO send notification to user aceptado -- Revisar nuevamente el add de la comunidad al user
    const communityToAdd = {
      communityRef: id,
    }
    const updateData = {
      $push: { community: communityToAdd },
    }
    await UserDAO.updateUser(userToAdd._id, updateData)
    return res.status(200).json({ msg: 'Miembro agregado' })
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
    console.error(error) //TODO send notification to admin and mods
    return res
      .status(500)
      .json({ msg: 'Hubo un problema al enviar la solicitud' })
  }
}

export {
  createCommunity,
  editCommunity,
  deleteCommunity,
  addMember,
  sendRequest,
}
