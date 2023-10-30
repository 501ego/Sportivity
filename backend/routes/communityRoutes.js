import express from 'express'
const router = express.Router()
import { createCommunity } from '../controllers/community/communityController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(createCommunity)

export default router
