/**
 * Activity Management API Handlers
 *
 * Este módulo contiene manejadores de API para la gestión de actividades.
 * Incluye funciones para crear, visualizar y eliminar actividades.
 *
 * Funciones:
 * 1. createActivity(req, res): Crea una nueva actividad.
 *    - Parámetros:
 *      - req: Objeto de solicitud, contiene datos de la actividad en req.body (nombre y descripción).
 *      - res: Objeto de respuesta, utilizado para enviar respuestas HTTP.
 *    - Comportamiento: Verifica si el nombre de la actividad ya existe. Si no, crea una nueva actividad.
 *    - Respuestas:
 *      - 201: Actividad creada con éxito.
 *      - 400: Error si el nombre de la actividad ya existe.
 *      - 500: Error del servidor si ocurre algún problema durante la creación.
 *
 * 2. viewActivities(req, res): Lista todas las actividades existentes.
 *    - Parámetros:
 *      - req: Objeto de solicitud.
 *      - res: Objeto de respuesta.
 *    - Comportamiento: Recupera y devuelve todas las actividades existentes.
 *    - Respuestas:
 *      - 200: Devuelve una lista de todas las actividades.
 *      - 500: Error del servidor si ocurre algún problema al recuperar las actividades.
 *
 * 3. deleteActivity(req, res): Elimina una actividad existente.
 *    - Parámetros:
 *      - req: Objeto de solicitud, contiene el 'id' de la actividad en req.params.
 *      - res: Objeto de respuesta.
 *    - Comportamiento: Verifica si la actividad existe. Si existe, la elimina.
 *    - Respuestas:
 *      - 200: Actividad eliminada con éxito.
 *      - 404: Error si la actividad no existe.
 *      - 500: Error del servidor si ocurre algún problema durante la eliminación.
 *
 * Notas:
 * - Los errores y validaciones están gestionados para asegurar la integridad de los datos.
 * - La conexión con la base de datos y la lógica de negocio está manejada por ActivityDAO.
 */

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
