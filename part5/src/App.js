import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Message from "./components/Message";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");
  const loggedUser = "loggedBlogAppUser";

  const blogFormRef = useRef();

  const handleLogin = (username, password) => async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem(loggedUser, JSON.stringify(user));
    } catch (error) {
      console.error(error);

      setErrorMessage("Incorrect credentials");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLikeClick = (blog) => async () => {
    const likedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
    };
    const user = {
      username: blog.user.username,
      name: blog.user.name,
      id: blog.user.id,
    };

    try {
      const updatedBlog = await blogService.update(blog.id, likedBlog);
      setBlogs(
        blogs
          .filter((blog) => blog.id !== updatedBlog.id)
          .concat({ ...updatedBlog, user })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveClick = (blog) => async () => {
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}?`;
    if (window.confirm(confirmMessage)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddBlog = (author, title, url) => async (event) => {
    event.preventDefault();

    const newBlog = {
      author,
      title,
      url,
    };

    try {
      const savedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat({ ...savedBlog, user }));
      setOkMessage(`${savedBlog.title} added successfully`);
      setTimeout(() => setOkMessage(""), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedUser);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginView = () => {
    return (
      <>
        <h1>Log in</h1>
        <LoginForm onSubmitHandle={handleLogin} />
      </>
    );
  };

  const userView = (user) => {
    return (
      <>
        <h1>Blogs</h1>
        <h3>
          {`Hello ${user.name}! 🖖 🙋‍♀️ 👋 `}
          <button onClick={handleLogout}>Logout</button>
        </h3>
        <Togglable buttonLabel={"Add a blog"} ref={blogFormRef}>
          <BlogForm onSubmitHandle={handleAddBlog} blogFormRef={blogFormRef} />
        </Togglable>
        <div className={"blogs"}>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onLikeClick={handleLikeClick(blog)}
                onDeleteClick={handleRemoveClick(blog)}
                isOwner={blog.user.username === user.username}
              />
            ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {errorMessage && <Message message={errorMessage} isError={true} />}
          {okMessage && <Message message={okMessage} isError={false} />}
        </header>
      </div>
      <header className="App-body">
        {user === null ? loginView() : userView(user)}
      </header>
    </>
  );
};

export default App;
