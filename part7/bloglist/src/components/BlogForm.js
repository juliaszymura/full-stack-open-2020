import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showSuccessWithTimeout } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogsReducer";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  input: {
    marginBottom: "0.5rem",
  },
  button: {
    margin: "0.7rem 0 0.5rem",
    gridArea: "add",
  },
  h4: {
    margin: "0 0 1rem",
    gridArea: "header",
  },
});

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const style = useStyles();

  const handleAddBlog = useCallback(
    (author, title, url) => async (event) => {
      event.preventDefault();

      const newBlog = {
        author,
        title,
        url,
      };

      try {
        dispatch(addBlog(newBlog));
        blogFormRef.current.toggleVisibility();
        dispatch(showSuccessWithTimeout(`${newBlog.title} added successfully`));
      } catch (error) {
        console.error(error);
      }
    },
    [blogFormRef, dispatch]
  );

  useEffect(() => {
    return () => {
      setTitle("");
      setAuthor("");
      setUrl("");
    };
  }, [handleAddBlog]);

  return (
    <>
      <Typography className={style.h4} variant="h4">
        Add a blog{" "}
      </Typography>
      <form onSubmit={handleAddBlog(author, title, url)}>
        <div>
          <TextField
            className={style.input}
            label="title"
            variant="outlined"
            value={title}
            name="title"
            id="blog-form-title"
            fullWidth={true}
            onChange={({ target }) => setTitle(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            className={style.input}
            label="author"
            variant="outlined"
            value={author}
            name="author"
            id="blog-form-author"
            fullWidth={true}
            onChange={({ target }) => setAuthor(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            className={style.input}
            label="url"
            variant="outlined"
            value={url}
            name="url"
            id="blog-form-url"
            fullWidth={true}
            onChange={({ target }) => setUrl(target.value)}
          ></TextField>
        </div>
        <Button
          className={style.button}
          variant="outlined"
          color="primary"
          type="submit"
          id="blog-form-button"
        >
          Add
        </Button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};

export default BlogForm;
