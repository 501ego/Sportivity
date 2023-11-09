import UserDAO from '../../dao/userDAO.js'

const register = async (req, res) => {
  try {
    const { userName, email } = req.body

    if (await UserDAO.findUserByField('userName', userName)) {
      return res.status(400).json({ msg: 'Nombre de usuario no disponible' })
    }

    if (await UserDAO.findUserByField('email', email)) {
      return res.status(400).json({ msg: 'El correo ya ha sido registrado' })
    }

    await UserDAO.createUser(req.body)
    return res.status(201).json({
      msg: 'Usuario registrado correctamente, revisa tu email para confirmar tu cuenta',
    })
    //TODO sendEmail(user.email, user.token)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const editUser = async (req, res) => {
  try {
    const { id } = req.params
    const userExist = await UserDAO.findUserById(id)
    if (!userExist) {
      return res.status(400).json({ msg: 'El usuario no está registrado' })
    }
    if (userExist._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ msg: 'No tienes permiso para editar' })
    }
    const updateFields = {
      name: req.body.name,
      lastName: req.body.lastName,
      city: req.body.city,
      commune: req.body.commune,
      region: req.body.region,
      country: req.body.country,
      profession: req.body.profession,
    }
    const updatedUser = await UserDAO.updateUser(id, updateFields)
    if (!updatedUser) {
      return res.status(500).json({ msg: 'Error al actualizar el usuario' })
    }
    return res.status(200).json({ msg: 'Usuario editado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const validateUser = async (req, res) => {
  const { id } = req.params
  const { rut, password } = req.body
  //TODO validar si RUT está registrado
  const userExist = await UserDAO.findUserById(id)
  if (!userExist) {
    return res.status(400).json({ msg: 'El usuario no está registrado' })
  } else if (String(userExist._id) !== req.user._id.toString()) {
    return res
      .status(400)
      .json({ msg: 'No tienes permiso para realizar esta acción' })
  }
  if (!(await UserDAO.verifyPassword(userExist, password))) {
    return res.status(400).json({ msg: 'Contraseña incorrecta' })
  } else if (await UserDAO.findUserByField('rut', rut)) {
    return res.status(400).json({ msg: 'El RUT ya existe en la base de datos' })
  } else {
    // TODO validar RUT (agregar funcion desde helpers/validateRut.js)
    try {
      const updatedUser = await UserDAO.updateUser(userExist._id, {
        rut: rut,
        isValidated: true,
      })
      if (updatedUser) {
        return res.status(200).json({ msg: 'Usuario validado' })
      } else {
        return res.status(500).json({ msg: 'No se pudo validar el usuario' })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

//TODO delete user??

export { register, editUser, validateUser }
