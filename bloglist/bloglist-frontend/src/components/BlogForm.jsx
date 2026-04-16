import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const nav = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBlog(newBlog);
    nav("/");
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <div>
      <h1>Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="title "
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="author "
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            label="url "
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
