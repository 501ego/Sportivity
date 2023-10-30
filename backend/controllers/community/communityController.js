import Community from '../../models/Community.js'

const createCommunity = async (req, res) => {
  //TODO validar si isVerified es true
  const { name } = req.body
  const communityExist = await Community.findOne({ name })
  if (communityExist) {
    const error = new Error('Nombre de comunidad no disponible')
    return res.status(400).json({ msg: error.message })
  } else {
    try {
      const community = new Community(req.body)
      await community.save()
      return res.status(201).json({
        msg: 'Comunidad creada correctamente',
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
    return res.json(communities)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
    return res.json(community)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const addMember = async (req, res) => {}

export { createCommunity, getCommunities, getCommunity }
