/**
 * Account Controllers
 *
 * Este archivo contiene controladores para manejar la autenticación de usuarios,
 * la confirmación de correo electrónico, el restablecimiento de contraseña,
 * y la gestión de perfil de usuario en una aplicación.
 *
 * Controladores:
 *
 * - login(req, res): Inicia sesión de un usuario.
 *   - Verifica confirmación de correo y contraseña.
 *   - Retorna datos del usuario y token JWT si la autenticación es exitosa.
 *
 * - confirmEmail(req, res): Confirma el correo electrónico de un usuario.
 *   - Retorna un mensaje de éxito o error.
 *
 * - resetPassword(req, res): Inicia el proceso de restablecimiento de contraseña.
 *   - Actualiza el token de usuario y envía un correo con instrucciones.
 *   - Retorna un mensaje de éxito o error.
 *
 * - checkToken(req, res): Verifica la validez de un token de restablecimiento.
 *   - Retorna un mensaje de validez o error.
 *
 * - newPassword(req, res): Establece una nueva contraseña para el usuario.
 *   - Actualiza la contraseña del usuario y resetea el token.
 *   - Retorna un mensaje de éxito o error.
 *
 * - profile(req, res): Obtiene los datos del perfil del usuario actual.
 *   - Retorna los datos del perfil del usuario.
 *
 * - logout(req, res): Cierra la sesión del usuario.
 *   - Añade el token JWT a una lista negra para prevenir su reutilización.
 *   - Retorna un mensaje de cierre de sesión exitoso.
 *
 * Notas:
 * - Los controladores utilizan UserDAO para operaciones de base de datos relacionadas con usuarios.
 * - Se incluye manejo de errores para garantizar respuestas apropiadas a situaciones fallidas.
 */

import generateJWT from '../../helpers/generateJWT.js'
import UserDAO from '../../dao/userDAO.js'
import { sendEmail } from '../../helpers/email.js'

const login = async (req, res) => {
  const { password } = req.body
  const userExist = req.userExist
  if (!userExist.confirmedEmail) {
    return res
      .status(400)
      .json({ msg: 'Confirma tu correo para iniciar sesión' })
  } else {
    try {
      if (await UserDAO.verifyPassword(userExist, password)) {
        const { _id, userName, email } = userExist
        return res.json({
          _id,
          userName,
          email,
          token: generateJWT(_id),
        })
      } else {
        return res.status(400).json({ msg: 'Contraseña incorrecta' })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const confirmEmail = async (req, res) => {
  try {
    return res.status(200).json({ msg: 'Correo confirmado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const resetPassword = async (req, res) => {
  const userExist = req.userExist
  try {
    await UserDAO.updateUserToken(userExist)

    // TODO: Send email logic here. Perhaps another DAO or service function?
    // TODO: Add logic for the token to expire in 24 hours
    return res.status(200).json({
      msg: 'Revisa tu email para cambiar tu contraseña',
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const checkToken = async (req, res) => {
  try {
    return res.status(200).json({ msg: 'Token válido' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const newPassword = async (req, res) => {
  const { password } = req.body
  const userExist = req.userExist
  try {
    await UserDAO.updateUserPasswordAndResetToken(userExist, password)
    return res.status(200).json({ msg: 'Contraseña actualizada' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const profile = async (req, res) => {
  const { user } = req
  return res.json(user)
}

let blacklistedTokens = []

const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  blacklistedTokens.push(token)

  res.status(200).json({ msg: 'Has cerrado sesión correctamente' })
}

export {
  login,
  confirmEmail,
  resetPassword,
  checkToken,
  newPassword,
  profile,
  logout,
}
