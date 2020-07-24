import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onSubmitHandle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    return () => {
      setTitle("");
      setAuthor("");
      setUrl("");
    };
  }, [onSubmitHandle]);

  return (
    <>
      <h2>Add a blog </h2>
      <form onSubmit={onSubmitHandle(author, title, url)}>
        <table>
          <tbody>
            <tr>
              <td>Title</td>
              <td>
                <input
                  type="text"
                  value={title}
                  name="title"
                  id="blog-form-title"
                  onChange={({ target }) => setTitle(target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Author</td>
              <td>
                <input
                  type="text"
                  value={author}
                  name="author"
                  id="blog-form-author"
                  onChange={({ target }) => setAuthor(target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>URL</td>
              <td>
                <input
                  type="text"
                  value={url}
                  name="url"
                  id="blog-form-url"
                  onChange={({ target }) => setUrl(target.value)}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" id="blog-form-button">
          Add
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  onSubmitHandle: PropTypes.func,
  blogFormRef: PropTypes.object.isRequired,
};

export default BlogForm;
