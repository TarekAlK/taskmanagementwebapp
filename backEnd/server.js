const express = require('express')
const app = express()
const cors = require('cors')
const tasks = require('./routes/task')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()
const port = 5000

app.use(express.json())
app.use(cors())
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
        console.log(`inshallah listeing on port ${port}...`)
    })
    } catch (error) {
        console.log(error)
    }
}

start()