const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).end()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malforatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = jwt.verify(token, process.env.SECRET)

    if (!request.token.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    next()
  } else next()
}

const userExtractor = async (request, response, next) => {
  request.user = await User.findById(request.token.id)

  next()
}

const blogExtractor = async (request, response, next) => {
  request.blog = await Blog.findById(request.params.id)

  next()
}

module.exports = {
  errorHandler, 
  unknownEndPoint, 
  requestLogger, 
  tokenExtractor,
  userExtractor,
  blogExtractor
}
