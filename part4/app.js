const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGODB_URI}`)

// connect to mongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch(error => {
    console.log('error connecting to mongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
