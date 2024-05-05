import { useState, useEffect, useRef, useContext } from 'react'
import { MainContext } from './context/MainProvider'
import { message } from 'antd'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import SkeletonLoader from './components/Animations/Skeleton'
import Auth from './components/Auth/Auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const blogFormRef = useRef()
  const { user, setUser } = useContext(MainContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      setUser(userInfo)
      blogService.setToken(userInfo.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      setLoading(false)
    })
  }, [])

  // sorted blogs by name
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  // handle creating a new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        message.success('Blog has been created successfully')
      })
      .catch((error) => {
        console.log('Error while posting:', error.message)
        message.error('Error while creating a new blog!')
      })
  }

  // handle updating a blog
  const updateBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch((error) => {
        console.log('Error:', error.message)
        message.error(`${error.message}`)
      })
  }

  // handle removing a blog
  const removeBlog = async (id) => {
    try {
      window.confirm(
        `Are you sure you want to delete this blog by ${user.username}`
      )
      await blogService.remove(id) // send delete request to the backend

      const updatedBlogs = blogs.filter((blog) => blog.id !== id) // filter out the removed item from the current list of blogs

      setBlogs(updatedBlogs) // update the state with the new list of blogs
      message.success('Blog deleted successfully')
    } catch (error) {
      message.error(error.message)
    }
  }

  // handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    message.success(`${user.name} logged out`)
    console.log(`${user.name} logged out`)
  }

  // login form to enter username and password
  if (user === null) {
    return (
      <Auth />
    )
  }

  return (
    <>
      <div className="blogs-list">
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
        {loading
          ? <SkeletonLoader />
          :
          sortedBlogs.map((blog, index) => (
            <Blog
              key={blog.id}
              blog={blog}
              index={index}
              updateBlog={() => updateBlog(blog.id)}
              removeBlog={() => removeBlog(blog.id)}
            />
          )
          )}
      </div>
      <Footer />
    </>
  )
}

export default App
