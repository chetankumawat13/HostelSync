const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()


app.use(express.json())
app.use(cookieParser())


/**
 * Import authentication routes and use them under the /api/auth path.
 */
const authRoutes = require('./routes/auth.routes')




app.use('/api/auth', authRoutes)



module.exports = app