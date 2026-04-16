import { Link } from 'react-router-dom'
import Notification from './Notification'

const BlogList = ({ blogs, message }) => {
  if (!blogs) return
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      <Notification message={message} />
      <h2>blogs</h2>
      <ul>
        {sortedBlogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogList
