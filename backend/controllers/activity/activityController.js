import ActivityDAO from '../../dao/activityDAO.js'

const createActivity = async (req, res) => {
  const { name, description } = req.body
  const nameExist = await ActivityDAO.findActivityByName(name)
  if (nameExist) {
    return res.status(400).json({ msg: 'El nombre de la actividad ya existe' })
  }
  try {
    await ActivityDAO.createActivity({ name, description })
    return res.status(201).json({ msg: 'Actividad creada' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const viewActivities = async (req, res) => {
  try {
    const activities = await ActivityDAO.findAllActivities()
    return res.status(200).json(activities)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params
    const activityExist = await ActivityDAO.findActivityById(id)
    if (!activityExist) {
      return res.status(404).json({ msg: 'La actividad no existe' })
    }
    await ActivityDAO.deleteActivity(id)
    return res.status(200).json({ msg: 'Actividad eliminada' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

export { createActivity, deleteActivity, viewActivities }
