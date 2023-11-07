import express from 'express'
const router = express.Router()
import {
  register,
  editUser,
  validateUser,
} from '../controllers/user/userController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(register)
router.route('/edituser/:id').put(checkAuth, editUser)
router.route('/validateuser/:id').put(checkAuth, validateUser)

export default router
