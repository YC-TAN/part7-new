import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { useUser } from "../store/user";

const Blog = () => {
  const { id } = useParams();
  const { blog, isPending, like, remove } = useBlogs(id);
  const user = useUser();
  const nav = useNavigate();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const onLike = () => like(blog);

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog);
      nav("/");
    }
  };

  const showRemoveButton = user && 
    (user.username === blog.user?.username)

  if (isPending) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found!</p>;

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
