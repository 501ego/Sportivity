/**
 * User Account and Authentication Routes
 *
 * Este archivo define las rutas para la autenticación y gestión de cuentas de usuario.
 *
 * Rutas:
 *
 * - POST /login: Inicia sesión para un usuario.
 *   - Middleware: userExist (verifica si el usuario existe).
 *   - Controlador: login (autentica y retorna datos del usuario).
 *
 * - GET /confirm/:token: Confirma el correo electrónico del usuario.
 *   - Middleware: userExist (verifica si el usuario existe basado en el token).
 *   - Controlador: confirmEmail (confirma el correo electrónico del usuario).
 *
 * - POST /resetpassword: Inicia el proceso de restablecimiento de contraseña.
 *   - Middleware: userExist (verifica si el usuario existe).
 *   - Controlador: resetPassword (envía correo para restablecer contraseña).
 *
 * - GET /checktoken/:token: Verifica la validez de un token de restablecimiento.
 *   - Middleware: userExist (verifica si el usuario existe basado en el token).
 *   - Controlador: checkToken (verifica la validez del token).
 *
 * - POST /checktoken/:token: Establece una nueva contraseña.
 *   - Middleware: userExist (verifica si el usuario existe basado en el token).
 *   - Controlador: newPassword (actualiza la contraseña del usuario).
 *
 * - GET /profile: Obtiene el perfil del usuario autenticado.
 *   - Middleware: checkAuth (verifica autenticación del usuario).
 *   - Controlador: profile (retorna datos del perfil del usuario).
 *
 * Notas:
 * - Las rutas están protegidas y validadas con middlewares específicos.
 * - Los controladores manejan la lógica de negocio para cada operación relacionada con la cuenta.
 */

import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/checkAuth.js'

import {
  login,
  confirmEmail,
  resetPassword,
  checkToken,
  newPassword,
  profile,
} from '../controllers/user/accountController.js'

import { userExist } from '../middleware/validations/userValidator.js'

router.route('/login').post(userExist, login)
router.route('/confirm/:token').get(userExist, confirmEmail)
router.route('/resetpassword').post(userExist, resetPassword)
router
  .route('/checktoken/:token')
  .get(userExist, checkToken)
  .post(userExist, newPassword)
router.route('/profile').get(checkAuth, profile)

export default router
