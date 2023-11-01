import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/checkAuth.js'

import {
  login,
  confirmEmail,
  resetPassword,
  checkToken,
  newPassword,
  profile,
} from '../controllers/user/accountController.js'

router.route('/login').post(login)
router.route('/confirm/:token').get(confirmEmail)
router.route('/resetpassword').post(resetPassword)
router.route('/checktoken/:token').get(checkToken).post(newPassword)
router.route('/profile').get(checkAuth, profile)

export default router