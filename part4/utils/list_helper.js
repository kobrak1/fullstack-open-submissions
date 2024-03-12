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
};
