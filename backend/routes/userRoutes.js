import express from 'express'
const router = express.Router()
import { register } from '../controllers/userController.js'
//import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(register)

export default router
