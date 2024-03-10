require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')

mongoose.set('strictQuery', false)

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch(error => {
        console.log('error connecting to mongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs', blogsRouter)

module.exports = app