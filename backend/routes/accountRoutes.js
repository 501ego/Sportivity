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

import { userExist } from '../middleware/validations/userValidator.js'

router.route('/login').post(userExist, login)
router.route('/confirm/:token').get(userExist, confirmEmail)
router.route('/resetpassword').post(userExist, resetPassword)
router
  .route('/checktoken/:token')
  .get(userExist, checkToken)
  .post(userExist, newPassword)
router.route('/profile').get(checkAuth, profile)

export default router
