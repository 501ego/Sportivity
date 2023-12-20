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
