const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

// check if the server works
blogsRouter.get('/', async (request, response,) => {
  if (response.statusCode !== 200) {
    console.log('response is not ok')
  }
  console.log('response is ok')
  response.send('hello mars hellooo')
})

// get all blogs
blogsRouter.get('/all', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  } catch (exception) {
    next(exception)
  }
})

// post a blog
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
