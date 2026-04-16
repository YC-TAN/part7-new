import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

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

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find( b => b.id === match.params.id)
    :null

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
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
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

  const padding = {
    padding: 5,
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        {user ? (
          <>
            <Link style={padding} to="/new">
              New Blog
            </Link>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={<BlogList blogs={blogs} message={message} user={user} />}
        />
        <Route path="/login" element={<LoginForm login={handleLogin} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              addLike={handleLike}
              deleteBlog={handleDelete}
              user={user}
            />
          }
        ></Route>
        <Route path="/new" element={<BlogForm createBlog={handleAddBlog} />} />
      </Routes>
    </div>
  )
}

export default App
