import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";

import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotFound from "./components/NotFound";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ text: "login successful", type: "success" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setNotification({ text: errorMessage, type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setNotification({ text: "logout successful", type: "success" });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    setUser(null);
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs((prev) => prev.concat(blog));
      setNotification({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setNotification({ text: errorMessage, type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLike = async (updatedBlog) => {
    try {
      const update = await blogService.update(updatedBlog.id, updatedBlog);
      setBlogs((prev) => prev.map((b) => (b.id === update.id ? update : b)));
      setNotification({
        text: `liked ${update.title} by ${update.author}`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setNotification({ text: errorMessage, type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      setNotification({
        text: `deleted ${blog.title} by ${blog.author}`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setNotification({ text: errorMessage, type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={style}>
            blogs
          </Button>
          {user ? (
            <div>
              <Button color="inherit" component={Link} to="/new" sx={style}>
                NEW BLOG
              </Button>
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={style}>
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogList blogs={blogs} user={user} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <LoginForm login={handleLogin} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog
                blog={blog}
                addLike={handleLike}
                deleteBlog={handleDelete}
                user={user}
              />
            </ErrorBoundary>
          }
        ></Route>
        <Route
          path="/new"
          element={
            <ErrorBoundary>
              <BlogForm createBlog={handleAddBlog} />
            </ErrorBoundary>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
