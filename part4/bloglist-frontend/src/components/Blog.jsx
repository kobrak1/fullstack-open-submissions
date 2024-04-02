const Blog = ({ blog, index }) => (
  <div>
    <b>{index + 1}</b> - {blog.title} <b>{blog.author}</b> 
  </div>  
)

export default Blog