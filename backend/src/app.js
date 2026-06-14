const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()


app.use(express.json())
app.use(cookieParser())



const authRoutes = require('./routes/auth.routes')
const roomRoutes = require('./routes/room.routes')
const studentRoutes = require('./routes/student.routes')
const leaveRoutes = require('./routes/leave.routes')

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/leaves', leaveRoutes)





module.exports = app