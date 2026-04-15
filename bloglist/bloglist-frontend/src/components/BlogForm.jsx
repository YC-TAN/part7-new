import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

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
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
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
