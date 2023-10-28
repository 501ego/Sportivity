import express from 'express'
const router = express.Router()
import {
  register,
  login,
  confirmEmail,
  resetPassword,
  checkToken,
  newPassword,
  profile,
  editUser,
} from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(register)
router.route('/login').post(login)
router.route('/confirm/:token').get(confirmEmail)
router.route('/resetpassword').post(resetPassword)
router.route('/checktoken/:token').get(checkToken).post(newPassword)
router.route('/profile').get(checkAuth, profile)
router.route('/edituser/:id').put(checkAuth, editUser)

export default router
