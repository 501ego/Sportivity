import UserDAO from '../../dao/userDAO.js'
import { sendEmail } from '../../helpers/email.js'

const register = async (req, res) => {
  try {
    const user = await UserDAO.createUser(req.body)

    sendEmail(user)
    return res.status(201).json({
      msg: 'Usuario registrado correctamente, revisa tu email para confirmar tu cuenta',
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const editUser = async (req, res) => {
  try {
    const userExist = req.userExist
    const updateFields = {
      name: req.body.name,
      lastName: req.body.lastName,
      city: req.body.city,
      commune: req.body.commune,
      region: req.body.region,
      country: req.body.country,
      profession: req.body.profession,
    }
    await UserDAO.updateUser(userExist._id, updateFields)
    return res.status(200).json({ msg: 'Usuario editado' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const validateUser = async (req, res) => {
  const { rut, password } = req.body
  //TODO validar si RUT está registrado

  const userExist = req.user

  if (userExist.isValidated)
    return res.status(400).json({ msg: 'El usuario ya está validado' })
  if (!(await UserDAO.verifyPassword(userExist, password))) {
    return res.status(400).json({ msg: 'Contraseña incorrecta' })
  } else if (await UserDAO.findUserByField('rut', rut)) {
    return res.status(400).json({ msg: 'El RUT ya existe en la base de datos' })
  } else {
    // TODO validar RUT (agregar funcion desde helpers/validateRut.js)
    try {
      await UserDAO.updateUser(userExist._id, {
        rut: rut,
        isValidated: true,
      })
      return res.status(200).json({ msg: 'Usuario validado' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export { register, editUser, validateUser }
