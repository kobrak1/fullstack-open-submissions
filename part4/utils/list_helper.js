const Blog = require('../models/blog')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const getAllData = async () => {
  const blogs = await Blog.find({})
  const newBlogs = blogs.map(blog => blog.toJSON)
  return newBlogs
}


const dummy = (blogs) => {
  // ...
  return 1;
};


const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};


const favoriteBlogs = (blogs) => {
  const blogLikes = blogs.map((blog) => blog.likes);
  const highestLike = Math.max(...blogLikes);
  return blogs.find((blog) => blog.likes === highestLike);
};


const mostBlogs = (blogs) => {
  const blogAuthors = blogs.map((blog) => blog.author);
  const mostFrequent = (arr) => {
    const frequencyMap = {};
    let maxElement = arr[0];
    let maxCount = 1;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (frequencyMap[element]) {
        frequencyMap[element]++;
      } else {
        frequencyMap[element] = 1;
      }

      if (frequencyMap[element] > maxCount) {
        maxElement = element;
        maxCount = frequencyMap[element];
      }
    }
    return { maxElement, maxCount };
  };
  return mostFrequent(blogAuthors);
};


const mostLikes = (blogs) => {
  const authorLikes = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    authorLikes[author] = (authorLikes[author] || 0) + likes;
  });
  // find the author with the most likes
  let maxLikes = 0;
  let mostLikedAuthor = null;
  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      mostLikedAuthor = author;
    }
  }
  return { mostLikedAuthor, maxLikes };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
  blogs,
  getAllData,
};
