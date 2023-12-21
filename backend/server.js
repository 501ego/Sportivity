import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import communityRoutes from './routes/communityRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import forumRoutes from './routes/ForumRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

//Configurar cors
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar la API
      callback(null, true)
    } else {
      //No puede consultar la API
      callback(new Error('No permitido por CORS'))
    }
  },
}

app.use(cors(corsOptions))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/communities', communityRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/forum', forumRoutes)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// Sokeet.io
import { Server } from 'socket.io'

const io = new Server(server, 
  {
    pingTimeout: 60000,
    cors: {
      origin: process.env.FRONTEND_URL,
    }
  }
)

io.on('connection', (socket) => {
  console.log('Connected to socket.io')

  socket.on('join community', (community) => {
    socket.join(community)
  })

  socket.on('new message', (message) => {
    const communityId = message.community._id
    socket.to(communityId).emit('message', message)
  })

})