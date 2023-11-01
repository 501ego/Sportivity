import express from 'express'
const router = express.Router()
import {
  createCommunity,
  editCommunity,
  deleteCommunity,
  addMember,
} from '../controllers/community/communityController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(checkAuth, createCommunity)
router
  .route('/:id')
  .put(checkAuth, editCommunity)
  .delete(checkAuth, deleteCommunity)

router.route('/addmember/:id').put(checkAuth, addMember)

export default router
