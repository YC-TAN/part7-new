import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage('login successful')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      setMessage(errorMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setMessage('logout successful')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setUser(null)
  }

  const handleAddBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs((prev) => prev.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      setMessage(errorMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (updatedBlog) => {
    try {
      const update = await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs((prev) => prev.map((b) => (b.id === update.id ? update : b)))
      setMessage(`liked ${update.title} by ${update.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      setMessage(errorMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs((prev) => prev.filter((b) => (b.id !== blog.id)))
      setMessage(`deleted ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      setMessage(errorMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm login={handleLogin} />
      </Togglable>
    )
  }

  if (!user) return loginForm()

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>

      {blogs.toSorted((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={handleLike} deleteBlog={handleDelete}/>
      ))}
    </div>
  )
}

export default App
