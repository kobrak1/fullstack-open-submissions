import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "", likes: 0 });

  // add a new blog
  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    })
    setNewBlog({ title: "", author: "", url: "", likes: 0 })
  };

    // handle blog change
    const handleBlogChange = (e) => {
        const { name, value } = e.target
        setNewBlog({...newBlog, [name]: value})
      }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="title"
        />
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="author"
        />
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="url"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
