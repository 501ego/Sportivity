import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/checkAuth.js'
import {
  createActivity,
  deleteActivity,
} from '../controllers/activity/activityController.js'

router.route('/').post(createActivity)
router.route('/:id').delete(deleteActivity)

export default router
