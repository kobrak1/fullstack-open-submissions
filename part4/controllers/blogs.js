const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

// check if the server works
blogsRouter.get('/', (request, response) => {
  if (response.statusCode !== 200) {
    console.log('response is not ok')
  }
  console.log('response is ok')
  response.send('hello mars hellooo')
})

// get all blogs
blogsRouter.get('/all', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// post a blog
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
