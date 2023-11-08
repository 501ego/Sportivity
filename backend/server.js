import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import communityRoutes from './routes/communityRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
const app = express()
app.use(express.json())
dotenv.config()

connectDB()

// Routes
app.use('/api/users', userRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/communities', communityRoutes)
app.use('/api/events', eventRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
