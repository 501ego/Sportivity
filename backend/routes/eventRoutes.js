import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/checkAuth.js'
import {
  createEvent,
  acceptEvent,
  editEvent,
  deleteEvent,
  deleteUserFromEvent,
  exitFromEvent,
  getEvents,
  getEvent,
} from '../controllers/events/eventsController.js'

router.route('/:id').post(checkAuth, createEvent)
router.route('/getevent/:id').get(checkAuth, getEvent)
router.route('/getevents').get(checkAuth, getEvents)
router.route('/participate/:id').put(checkAuth, acceptEvent)
router.route('/edit/:id/:idEvent').put(checkAuth, editEvent)
router.route('/delete/:id/:idEvent').delete(checkAuth, deleteEvent)
router.route('/deleteuser/:id/:idEvent').put(checkAuth, deleteUserFromEvent)
router.route('/exit/:id/:idEvent').put(checkAuth, exitFromEvent)
export default router
