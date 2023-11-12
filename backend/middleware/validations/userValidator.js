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
