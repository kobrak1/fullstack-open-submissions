import { useState } from "react"

const Blog = ({ blog, index, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <p><b>{index + 1}</b> - {blog.title} <b>{blog.author}</b></p>
        <button onClick={() => setVisible(!visible)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <p><b>{index + 1}</b> - {blog.title} <b>{blog.author}</b></p>
          <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <a href='#'>{blog.url}</a>
        <div>
          <p>likes <b>{blog.likes}</b></p>
          <button onClick={updateBlog}>like</button>
        </div>
        <p>{blog.user.username}</p>
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )  
}

export default Blog