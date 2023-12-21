import express from 'express'
const router = express.Router()
import {
  register,
  editUser,
  validateUser,
} from '../controllers/user/userController.js'
import {
  userNameOrEmailExist,
  userExist,
  userHasPermission,
} from '../middleware/validations/userValidator.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(userNameOrEmailExist, register)
router
  .route('/edituser/:id')
  .put(checkAuth, userExist, userHasPermission, editUser)
router.route('/validateuser').put(checkAuth, validateUser)

export default router
