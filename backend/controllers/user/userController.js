import User from '../../models/User.js'
import generateId from '../../helpers/generateId.js'

const register = async (req, res) => {
  const { userName, email } = req.body
  const userExist = await User.findOne({ userName })
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

const validateUser = async (req, res) => {
  const { id } = req.params
  const { rut, password } = req.body
  const userExist = await User.findById(id)
  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  } else if (!userExist._id.toString() === req.user._id.toString()) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para realizar esta acción' })
  } else if (await userExist.verifyPassword(password)) {
    // TODO validar RUT (agregar funcion desde helpers/validateRut.js)
    try {
      userExist.rut = rut
      userExist.isValidated = true
      await userExist.save()
      return res.status(200).json({ msg: 'Usuario validado' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const addMod = async (req, res) => {
  //Usuario que agrega al mod (admin)
  const { id } = req.params
  const userExist = await User.findById(id)
  //Usuario a agregar como mod
  const { userName } = req.body
  const userNameExist = await User.findOne({ userName })

  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  } else if (!userExist._id.toString() === req.user._id.toString()) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para realizar esta acción' })
  } else if (await userExist.isValidated) {
    if (!userNameExist) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    } else if (userNameExist.isMod) {
      return res.status(400).json({ msg: 'El usuario ya es moderador' })
    }
    //TODO ver si el mod a agregar pertenece a la comunidad, enviar correo de invitacion
    try {
      userNameExist.isMod = true
      await userExist.save()
      return res
        .status(200)
        .json({ msg: 'Usuario añadido al grupo de moderación' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export { register, editUser, validateUser, addMod }
