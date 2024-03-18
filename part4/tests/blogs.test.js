const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const list_helper = require("../utils/list_helper");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = list_helper.blogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(i => i.save())
  await Promise.all(promiseArray)
})  

test.only("data about blogs are returned as json", async () => {
  await api
    .get("/api/blogs/all")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("the application return the correct amount of blog posts in JSON format", async () => {
  const response = await api.get("/api/blogs/all");
  assert.strictEqual(response.body.length, 6);
});

test("there is an array of blogs", () => {
  const result = list_helper.dummy(list_helper.blogs);
  assert.strictEqual(result, 1);
});

test("verify the total likes", () => {
  const result = list_helper.totalLikes(list_helper.blogs);
  assert.strictEqual(result, 36);
});

test("this is the blog that got the highest amount of likes", () => {
  const result = list_helper.favoriteBlogs(list_helper.blogs);
  assert.deepStrictEqual(result, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  });
});

test("this is the author with the largest number of blogs", () => {
  const result = list_helper.mostBlogs(list_helper.blogs);
  const authorInfo = {
    author: "Robert C. Martin",
    blogs: 3,
  };
  const resultInfo = {
    author: result.maxElement,
    blogs: result.maxCount,
  };
  assert.deepStrictEqual(resultInfo, authorInfo);
});

test("this is the author with the largest number of likes", () => {
  const result = list_helper.mostLikes(list_helper.blogs);
  const authorInfo = {
    author: "Edsger W. Dijkstra",
    likes: 17,
  };
  const resultInfo = {
    author: result.mostLikedAuthor,
    likes: result.maxLikes,
  };
  assert.deepStrictEqual(resultInfo, authorInfo);
});

test("unique identifier property of blog posts is named as id", async () => {
  const response = await api.get("/api/blogs/all");

  // Check if each blog post in the response has an 'id' property
  response.body.forEach((blogPost) => {
    assert.ok(blogPost.id, "Blog post does not have an id property");
    assert.strictEqual(
      typeof blogPost.id,
      "string",
      "Blog post id is not a string"
    );
  });
});

test("a valid blog can be added", async () => {
  const newData = {
    title: "Scum Bags",
    author: "Burak Karhan",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newData)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await list_helper.getAllData()
  assert.strictEqual(blogsAtEnd.length, list_helper.blogs.length + 1)
})

test('data has not been sent since the like property is missing', async () => {
  const newData = {
    title: "Scum Bags",
    author: "Burak Karhan",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  } 

  await api.post('/api/blogs').send(newData).expect(400)
  const dataFromDb = await Blog.find({})
  assert.strictEqual(dataFromDb.length, list_helper.blogs.length)
})

after(async () => {
  await mongoose.connection.close();
});
