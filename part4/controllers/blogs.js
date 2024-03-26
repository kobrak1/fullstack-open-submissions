const Blog = require("../models/blog");
const User = require('../models/user')
const blogsRouter = require("express").Router();

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
blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findById(body.userId)
    const blog = new Blog({ ...body, user: user.id })

    const savedBlog = await blog.save();
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
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findByIdAndDelete(request.params.id);
    blogToDelete
      ? response.status(204).end()
      : response.status(404).send("there is not a blog with this id");
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
