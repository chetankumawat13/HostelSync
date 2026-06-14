const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


const authRoutes = require('./routes/auth.routes')
const roomRoutes = require('./routes/room.routes')
const studentRoutes = require('./routes/student.routes')
const leaveRoutes = require('./routes/leave.routes')
const complaintRoutes = require('./routes/complaint.routes')
const visitorRoutes = require('./routes/visitor.routes')

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/leaves', leaveRoutes)
app.use('/api/complaints', complaintRoutes)
app.use('/api/visitors', visitorRoutes)





module.exports = app