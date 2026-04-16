import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  if (!blogs) return;
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>blogs</h2>
      <ul>
        {sortedBlogs.map((b) => (
          <li key={b.id} className>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
