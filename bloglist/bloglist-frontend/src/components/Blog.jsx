import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const onLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLike(updatedBlog)
  }

  const onDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <span style={visible ? showWhenVisible : hideWhenVisible}>
          <button onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </button>
        </span>
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={onLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          <button onClick={onDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
