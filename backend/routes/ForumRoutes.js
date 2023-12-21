import express from 'express'
const router = express.Router()
import {
	createMessage,
	getMessages
} from '../controllers/forum/forumController.js'
import checkAuth from '../middleware/checkAuth.js'

router
	.route('/:id')
	.post(checkAuth, createMessage)
	.get(checkAuth, getMessages)

export default router