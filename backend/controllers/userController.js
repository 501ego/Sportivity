import User from '../models/User.js'
import generateId from '../helpers/generateId.js'

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
    return res.status(201).json({
      msg: 'Usuario registrado correctamente, revisa tu email para confirmar tu cuenta',
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const login = async (req, res) => {
  //const { password } = req.body
  const userName = await User.findOne({ userName })
  const email = await User.findOne({ email })

  if (!userName || !email) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  }
  // TODO PASSWORD LOGIC
}

export { register, login }
