/**
 * JWT Authentication Middleware
 *
 * Este middleware valida el token JWT de un usuario para autenticar solicitudes.
 *
 * Funcionalidad:
 *
 * - checkAuth(req, res, next): Verifica la autenticidad del token JWT proporcionado.
 *   - Extrae el token de la cabecera 'Authorization'.
 *   - Verifica si el token está en la lista negra (blacklistedTokens).
 *   - Decodifica y valida el token utilizando la clave secreta de JWT.
 *   - Recupera la información del usuario basada en el token y la asigna a 'req.user'.
 *   - Gestiona errores relacionados con tokens no proporcionados o inválidos.
 *
 * Casos de uso:
 *   - Se usa como middleware en rutas que requieren autenticación del usuario.
 *
 * Respuestas:
 *   - Si el token es válido, pasa el control al siguiente middleware o controlador.
 *   - Si el token es inválido o no está presente, retorna un mensaje de error.
 *
 * Notas:
 * - Es crucial para mantener la seguridad y la integridad de la sesión del usuario.
 * - La lista negra de tokens permite manejar el cierre de sesión y la revocación de acceso.
 */

import jwt from 'jsonwebtoken'
import User from '../models/User.js'

let blacklistedTokens = []
const checkAuth = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ msg: 'Token inválido' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('+id +email +username')
      return next()
    } catch (error) {
      return res.status(404).json({ msg: 'Token inválido' })
    }
  }

  if (!token) {
    const error = new Error('No hay token')
    return res.status(401).json({ msg: error.message })
  }

  next()
}

export default checkAuth
