import { useNavigate } from "react-router-dom";

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const nav = useNavigate();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const onLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    addLike(updatedBlog);
  };

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
      nav("/");
    }
  };

  const showRemoveButton =
    user?.username === blog.user?.username || user?.id === blog.user?.id;

  if (!blog) {
    return null;
  }

  return (
    <div className="blog" style={blogStyle}>
      <h1>
        {blog.author}: {blog.title}
      </h1>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} {user && <button onClick={onLike}>like</button>}
      </div>
      <div>Added by {blog.user?.name}</div>
      {showRemoveButton && <button onClick={onDelete}>remove</button>}
    </div>
  );
};

export default Blog;
