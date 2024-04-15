const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user')
const { userExtractor, blogExtractor } = require('../utils/middleware')

// get all blogs
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs);
  } catch (exception) {
    next(exception)
  }
});

// get a specific blog
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    blog
      ? response.json(blog)
      : response.status(404).send("there is not a blog with this id");
  } catch (error) {
    next(error);
  }
});

// post a blog
blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body // assign the request body to variable 'body'

    const user = request.user  // assign the user data set by userExtractor as 'request.user' to variable 'user'
    
    const newBlog = new Blog({ ...body, user: user.id })

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

// update a blog
blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    )
    blog ? response.status(200).json(blog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

// delete a blog
blogsRouter.delete("/:id", blogExtractor, async (request, response, next) => {
  try {
    const authorId = request.blog.user.toString()
    const userId = request.token.id

    if ( authorId && authorId === userId) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end()
    }
    else response.status(401).send({ error: 'You are not allowed to delete someone else\'s blogs' })
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
