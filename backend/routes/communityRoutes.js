/**
 * Community Management Routes
 *
 * Este archivo define las rutas para la gestión de comunidades en la aplicación.
 * Todas las rutas están protegidas con el middleware 'checkAuth' para asegurar la autenticación del usuario.
 *
 * Rutas:
 *
 * - POST /: Crea una nueva comunidad.
 *   - Controlador: createCommunity.
 *
 * - PUT /:id: Edita una comunidad existente.
 *   - Controlador: editCommunity.
 *
 * - DELETE /:id: Elimina una comunidad existente.
 *   - Controlador: deleteCommunity.
 *
 * - GET /getcommunites: Obtiene todas las comunidades.
 *   - Controlador: getCommunities.
 *
 * - GET /getmycommunites: Obtiene las comunidades del usuario actual.
 *   - Controlador: getMyCommunity.
 *
 * - PUT /addmember/:id: Agrega un miembro a una comunidad.
 *   - Controlador: addMember.
 *
 * - GET /sendrequest/:id: Envía una solicitud para unirse a una comunidad.
 *   - Controlador: sendRequest.
 *
 * - GET /getrequests: Obtiene solicitudes de unión a comunidades del usuario.
 *   - Controlador: getRequests.
 *
 * - PUT /deletemember/:id: Elimina un miembro de una comunidad.
 *   - Controlador: deleteMember.
 *
 * - PUT /exit/:id: Permite a un usuario salir de una comunidad.
 *   - Controlador: exitCommunity.
 *
 * - PUT /addmoderator/:id: Asigna un moderador en una comunidad.
 *   - Controlador: addModerator.
 *
 * - PUT /deletemoderator/:id: Elimina un moderador de una comunidad.
 *   - Controlador: deleteModerator.
 *
 * - GET /community/:id: Obtiene detalles de una comunidad específica.
 *   - Controlador: getCommunityById.
 *
 * - GET /search/:name: Busca comunidades por nombre.
 *   - Controlador: getCommunityByName.
 *
 * Notas:
 * - Los métodos HTTP de cada ruta (POST, PUT, DELETE, GET) indican la acción realizada.
 * - La ID de la comunidad o el nombre son parámetros clave en varias rutas.
 */

import express from 'express'
const router = express.Router()
import {
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
} from '../controllers/community/communityController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(checkAuth, createCommunity)
router
  .route('/:id')
  .put(checkAuth, editCommunity)
  .delete(checkAuth, deleteCommunity)
router.route('/getcommunites').get(checkAuth, getCommunities)
router.route('/getmycommunites').get(checkAuth, getMyCommunity)
router.route('/addmember/:id').put(checkAuth, addMember)
router.route('/sendrequest/:id').get(checkAuth, sendRequest)
router.route('/getrequests').get(checkAuth, getRequests)
router.route('/deletemember/:id').put(checkAuth, deleteMember)
router.route('/exit/:id').put(checkAuth, exitCommunity)
router.route('/addmoderator/:id').put(checkAuth, addModerator)
router.route('/deletemoderator/:id').put(checkAuth, deleteModerator)
router.route('/community/:id').get(checkAuth, getCommunityById)
router.route('/search/:name').get(checkAuth, getCommunityByName)

export default router
