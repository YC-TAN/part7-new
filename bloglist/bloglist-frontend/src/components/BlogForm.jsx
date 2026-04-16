import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const nav = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createBlog(newBlog)
    nav('/')
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <h1>Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:{' '}
            <input name="title" value={newBlog.title} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input
              name="author"
              value={newBlog.author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:{' '}
            <input name="url" value={newBlog.url} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
