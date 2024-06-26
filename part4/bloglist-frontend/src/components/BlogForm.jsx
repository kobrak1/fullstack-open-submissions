import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  // add a new blog
  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    })
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  // handle blog change
  const handleBlogChange = (e) => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <input
          data-testid="title"
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="title"
        />
        <input
          data-testid="author"
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="author"
        />
        <input
          data-testid="url"
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="url"
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
