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

const mostBlogs = (blogs) => {
    const blogAuthors = blogs.map(blog => blog.author)
    const mostFrequent = (arr) => {
        const frequencyMap = {}
        let maxElement = arr[0]
        let maxCount = 1
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i]
            if (frequencyMap[element]) {
                frequencyMap[element]++
            } else {
                frequencyMap[element] = 1
            }

            if (frequencyMap[element] > maxCount) {
                maxElement = element
                maxCount = frequencyMap[element]
            }
        }
        return {maxElement, maxCount}
    }
    return mostFrequent(blogAuthors)
}

module.exports = {
    dummy, totalLikes, favoriteBlogs, mostBlogs
}