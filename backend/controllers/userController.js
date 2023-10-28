import User from '../models/User.js'
import generateId from '../helpers/generateId.js'
import generateJWT from '../helpers/generateJWT.js'

const register = async (req, res) => {
  const { username, email } = req.body
  const userExist = await User.findOne({ username })
  const emailExist = await User.findOne({ email })
  if (userExist) {
    const error = new Error('Nombre de usuario no disponible')
    return res.status(400).json({ msg: error.message })
  } else if (emailExist) {
    const error = new Error('El correo ya ha sido registrado')
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    user.token = generateId()
    await user.save()
    //TODO sendEmail(user.email, user.token)
    return res.status(201).json({
      msg: 'Usuario registrado correctamente, revisa tu email para confirmar tu cuenta',
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const login = async (req, res) => {
  const { email, userName, password } = req.body
  const userExist =
    (await User.findOne({ email })) || (await User.findOne({ userName }))

  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  } else if (!userExist.confirmedEmail) {
    return res
      .status(400)
      .json({ msg: 'Confirma tu correo para iniciar sesión' })
  } else {
    try {
      if (await userExist.verifyPassword(password)) {
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
  const { token } = req.params
  const userExist = await User.findOne({ token })

  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  }
  try {
    userExist.confirmedEmail = true
    userExist.token = ''
    await userExist.save()
    return res.status(200).json({ msg: 'Correo confirmado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const resetPassword = async (req, res) => {
  const { email, userName } = req.body
  const userExist =
    (await User.findOne({ email })) || (await User.findOne({ userName }))

  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  }
  try {
    userExist.token = generateId()
    await userExist.save()
    //TODO sendEmail(user.email, user.token)
    //TODO que el generateId() se autoelimine en 24 horas
    return res.status(200).json({
      msg: 'Revisa tu email para cambiar tu contraseña',
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const checkToken = async (req, res) => {
  const { token } = req.params
  const userExist = await User.findOne({ token })
  if (!userExist) {
    return res.status(400).json({ msg: 'Token inválido' })
  }
  return res.status(200).json({ msg: 'Token válido' })
}

const newPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const userExist = await User.findOne({ token })

  if (!userExist) {
    return res.status(400).json({ msg: 'Token inválido' })
  } else {
    try {
      userExist.password = password
      userExist.token = ''
      await userExist.save()
      return res.status(200).json({ msg: 'Contraseña actualizada' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const editUser = async (req, res) => {
  const { id } = req.params
  const userExist = await User.findById(id)

  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  } else if (!userExist._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ msg: 'No tienes permiso para editar' })
  } else {
    try {
      const updateFields = [
        'name',
        'lastName',
        'city',
        'commune',
        'region',
        'country',
        'profession',
      ]
      updateFields.forEach(field => {
        if (req.body[field]) {
          userExist[field] = req.body[field]
        }
      })
      await userExist.save()
      return res.status(200).json({ msg: 'Usuario editado' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const profile = async (req, res) => {
  const { user } = req
  return res.status(200).json({ user })
}

export {
  register,
  login,
  confirmEmail,
  resetPassword,
  checkToken,
  newPassword,
  profile,
  editUser,
}
