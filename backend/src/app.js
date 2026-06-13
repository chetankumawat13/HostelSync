const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()


app.use(express.json())
app.use(cookieParser())



const authRoutes = require('./routes/auth.routes')
const roomRoutes = require('./routes/room.routes')

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)





module.exports = app