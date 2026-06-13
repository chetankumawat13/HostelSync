require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/database')

const PORT = process.env.PORT || 3000

/**
 * Connect to the database before starting the server.
 */

connectDB()

/**
 * Start the server and listen on the specified port.
 */

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)


