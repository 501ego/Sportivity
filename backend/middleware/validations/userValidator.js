/**
 * User Validators
 *
 * Este archivo contiene middlewares para validar la existencia y permisos de usuarios
 * en una aplicación.
 *
 * Middlewares:
 *
 * - userExist(req, res, next): Verifica la existencia de un usuario.
 *   - Busca un usuario por '_id', 'id', 'email', 'userName', o 'token'.
 *   - Confirma el correo del usuario si es necesario.
 *   - Establece 'req.userExist' con los datos del usuario encontrado.
 *   - Retorna un error si el usuario no existe o si faltan parámetros.
 *
 * - userNameOrEmailExist(req, res, next): Verifica si el nombre de usuario o correo ya existen.
 *   - Retorna un error si el nombre de usuario o correo ya están registrados.
 *   - Continúa con el siguiente middleware si no hay conflictos.
 *
 * - userHasPermission(req, res, next): Verifica si el usuario actual tiene permiso para una operación.
 *   - Compara el 'id' en los parámetros con el 'id' del usuario en la sesión.
 *   - Retorna un error si no hay coincidencia o si faltan parámetros.
 *
 * Notas:
 * - Estos middlewares son esenciales para garantizar la seguridad y consistencia de las operaciones de usuario.
 * - Se utilizan para prevenir acciones no autorizadas y para validar datos de entrada.
 */

import UserDAO from '../../dao/userDAO.js'

const userExist = async (req, res, next) => {
  try {
    const { email, userName, _id } = req.body
    const { id, token } = req.params
    let user

    if (_id) {
      user = await UserDAO.findUserById(_id)
    } else if (id) {
      user = await UserDAO.findUserById(id)
    } else if (email || userName) {
      user = await UserDAO.findUserByCredentials(email, userName)
    } else if (token) {
      user = await UserDAO.findUserByField('token', token)

      if (user) {
        if (!user.confirmedEmail) {
          await UserDAO.confirmUserEmail(user)
        }
      } else {
        return res.status(400).json({ msg: 'No existe el usuario' })
      }
    } else {
      return res.status(400).json({ msg: 'Parámetros insuficientes' })
    }
    if (!user) {
      return res.status(400).json({ msg: 'No existe el usuario' })
    }
    req.userExist = user
    next()
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const userNameOrEmailExist = async (req, res, next) => {
  try {
    const { email, userName } = req.body
    if (await UserDAO.findUserByField('userName', userName)) {
      return res.status(400).json({ msg: 'Nombre de usuario no disponible' })
    }
    if (await UserDAO.findUserByField('email', email)) {
      return res.status(400).json({ msg: 'El correo ya ha sido registrado' })
    }
    next()
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const userHasPermission = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ msg: 'Parámetros insuficientes' })
    } else {
      if (!req.user) {
        return res.status(400).json({ msg: 'No existe el usuario' })
      }
      const user = await UserDAO.findUserById(id)
      if (user._id.toString() !== req.user._id.toString()) {
        return res
          .status(400)
          .json({ msg: 'No tienes permiso para realizar esta operación' })
      }
    }
    next()
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

export { userExist, userNameOrEmailExist, userHasPermission }
