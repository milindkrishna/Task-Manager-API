const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const tasks = require('./Routes/tasks')
const connectDB = require('./db/db.config')
const notFound = require('./middleware/not-found')
const errorhandlerMiddleware = require('./middleware/error-handler')
// middleware
// app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorhandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server started on port ${port} \nDB is connected Successfully`))
    } catch (error) {
        console.log(error)
    }
}

start()