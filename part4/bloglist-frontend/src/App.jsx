import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import SkeletonLoader from "./components/Animations/Skeleton";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "", likes: 0 });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs)
        setLoading(false)
      });
  }, []);

  // sorted blogs by name
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  // handle creating a new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        message.success("Blog has been created successfully");
      })
      .catch((error) => {
        console.log("Error while posting:", error.message);
        message.error("Error while creating a new blog!");
      });
  };

  // handle updating a blog
  const updateBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        console.log("Error:", error.message);
        message.error(`${error.message}`);
      });
  };

  // handle removing a blog
  const removeBlog = async (id) => {
    try {
      window.confirm(
        `Are you sure you want to delete this blog by ${user.username}`
      );
      await blogService.remove(id); // send delete request to the backend

      const updatedBlogs = blogs.filter((blog) => blog.id !== id); // filter out the removed item from the current list of blogs

      setBlogs(updatedBlogs); // update the state with the new list of blogs
      message.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error while deleting blog:", error);
      message.error("Error while deleting blog");
    }
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      message.success(`${user.name} logged in successfully`);
      console.log(`${user.name} logged in`);
    } catch (error) {
      console.log("Error while logging in:", error.message);
      message.error("Login failed. Please check your username and password!");
    }
  };

  // handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    message.success(`${user.name} logged out`);
    console.log(`${user.name} logged out`);
  };

  // login form to enter username and password
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div className="username">
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>
        <div className="password">
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
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
        { loading 
            ? <SkeletonLoader />
            : sortedBlogs.map((blog, index) => (
              <Blog
                key={blog.id}
                blog={blog}
                index={index}
                updateBlog={() => updateBlog(blog.id)}
                removeBlog={() => removeBlog(blog.id)}
              />
            ))}
      </div>
      <Footer />
    </>
  );
};

export default App;
