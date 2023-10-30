import User from '../../models/User.js'
import generateJWT from '../../helpers/generateJWT.js'
import generateId from '../../helpers/generateId.js'

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

const profile = async (req, res) => {
  const { user } = req
  return res.status(200).json({ user })
}

export { login, confirmEmail, resetPassword, checkToken, newPassword, profile }
