import express from 'express'
const router = express.Router()
import {
  createCommunity,
  editCommunity,
  deleteCommunity,
  addMember,
  sendRequest,
  deleteMember,
  exitCommunity,
  addModerator,
  deleteModerator,
  getCommunities,
  getMyCommunity,
  getCommunityById,
  getCommunityByName,
  getRequests,
} from '../controllers/community/communityController.js'
import checkAuth from '../middleware/checkAuth.js'

router.route('/').post(checkAuth, createCommunity)
router
  .route('/:id')
  .put(checkAuth, editCommunity)
  .delete(checkAuth, deleteCommunity)
router.route('/getcommunites').get(checkAuth, getCommunities)
router.route('/getmycommunites').get(checkAuth, getMyCommunity)
router.route('/addmember/:id').put(checkAuth, addMember)
router.route('/sendrequest/:id').get(checkAuth, sendRequest)
router.route('/getrequests/:id').get(checkAuth, getRequests)
router.route('/deletemember/:id').put(checkAuth, deleteMember)
router.route('/exit/:id').put(checkAuth, exitCommunity)
router.route('/addmoderator/:id').put(checkAuth, addModerator)
router.route('/deletemoderator/:id').put(checkAuth, deleteModerator)
router.route('/community/:id').get(checkAuth, getCommunityById)
router.route('/search/:name').get(checkAuth, getCommunityByName)

export default router
