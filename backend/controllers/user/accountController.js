import generateJWT from '../../helpers/generateJWT.js'
import UserDAO from '../../dao/userDAO.js'

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

export { login, confirmEmail, resetPassword, checkToken, newPassword, profile }
