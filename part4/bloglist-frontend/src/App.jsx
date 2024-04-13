import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      message.success(`${user.name} logged in successfully`)
      console.log(`${user.name} logged in`)
    } catch (error) {
      console.log('Error while logging in:', error.message);
      message.error('Login failed. Please check your username and password!')
    }
  }

  // handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    message.success(`${user.name} logged out`)
    console.log(`${user.name} logged out`)
  }

  // handle blog change
  const handleBlogChange = (e) => {
    const { name, value } = e.target
    setNewBlog({...newBlog, [name]: value})
  }

  // handle creating a new blog
  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: '', likes: 0 })
        message.success('Blog has been created successfully')
      })
      .catch(error => {
        console.log('Error while posting:', error.message)
        message.error('Error while creating a new blog!')
      })
  }

  // blog form to create a new blog
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        type='text' 
        name="title"
        value={newBlog.title}
        onChange={handleBlogChange}
        ref={inputRef}  // to focus on the textarea when the component is rendered
        placeholder='title'
      />
      <input 
        type='text'
        name='author'
        value={newBlog.author}
        onChange={handleBlogChange}
        placeholder='author'
      />
      <input 
        type='text'
        name='url'
        value={newBlog.url}
        onChange={handleBlogChange}
        placeholder='url'
      />
      <button type='submit'>post</button>
    </form>
  )

    // login form to enter username and password
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div className="username">
          <input 
            type="text"
            value={username}
            name='Username'
            onChange={e => setUsername(e.target.value)}
            placeholder='username' />
        </div>
        <div className="password">
          <input 
            type="text"
            value={password}
            name='Password'
            onChange={e => setPassword(e.target.value)}
            placeholder='password' 
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  return (
    <div className='blogs-list'>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogout()}>logout</button>
        <Togglable buttonLabel='new blog'>
          {blogForm()}
        </Togglable>
      </div>
      {blogs.map((blog, index) =>
        <Blog key={blog.id} blog={blog} index={index} />
      )}
    </div>
  )
}

export default App