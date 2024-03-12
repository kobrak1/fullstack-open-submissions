const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    const highestLike = Math.max(...blogLikes)
    return blogs.find(blog => blog.likes === highestLike)
}

module.exports = {
    dummy, totalLikes, favoriteBlogs
}