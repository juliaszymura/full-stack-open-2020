import React, { useEffect, useState } from "react";
import {
  commentBlog,
  deleteBlog,
  initBlogs,
  likeBlog,
} from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { showErrorWithTimeout } from "../reducers/notificationReducer";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    gridArea: "link",
    alignSelf: "center",
  },
  likes: {
    gridArea: "likes",
    alignSelf: "center",
  },
  likeButton: {
    gridArea: "like-button",
  },
  author: {
    gridArea: "author",
    alignSelf: "center",
  },
  removeButton: {
    gridArea: "remove-button",
  },
  blogInfo: {
    display: "grid",
    gridTemplate: `"link link" 
    "likes like-button" 
    "author remove-button" 1fr / auto 1fr`,
    gap: "1rem",
  },
  addComment: {
    marginTop: "0.5rem",
  },
});

const Blog = () => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initBlogs());

    return () => setComment("");
  }, [dispatch]);

  // waiting for blogs
  if (!blog) return null;
  const isOwner = () => user.username === blog.user.username;

  const handleLikeClick = (blog) => async () => {
    try {
      dispatch(likeBlog(blog.id));
    } catch (error) {
      console.error(error);
      const message = "Error occured, please try again.";
      dispatch(showErrorWithTimeout(message));
    }
  };

  const handleRemoveClick = (blog) => async () => {
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}?`;
    if (window.confirm(confirmMessage)) {
      try {
        dispatch(deleteBlog(blog.id));
        // waiting for backend to delete blog
        await new Promise((r) => setTimeout(r));
        history.push("/");
      } catch (error) {
        console.error(error);
        const message =
          "Error occured while attempting to delete blog. Please try again soon xD";
        dispatch(showErrorWithTimeout(message));
      }
    }
  };

  const removeButton = (blog) => (
    <Button variant="outlined" onClick={handleRemoveClick(blog)}>
      Remove this blog
    </Button>
  );

  const handleSubmitComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(id, comment));
    setComment("");
  };

  return (
    <div className={"blog-details"}>
      <Typography variant="h2">
        <i>{blog.title}</i> by {blog.author}
      </Typography>
      <div className={styles.blogInfo}>
        <Typography className={styles.link} variant="h6">
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Typography className={styles.likes} variant="body1">
          likes: {blog.likes}
        </Typography>
        <div className={styles.likeButton}>
          <Button variant="outlined" onClick={handleLikeClick(blog)}>
            Like
          </Button>
        </div>
        <div className={styles.author}>Added by: {blog.user.name}</div>
        <div className={styles.removeButton}>
          {isOwner() && removeButton(blog)}
        </div>
      </div>
      <Typography variant="h4">Comments</Typography>
      <form onSubmit={handleSubmitComment}>
        <TextField
          variant="outlined"
          label="comment"
          value={comment}
          name="comment"
          fullWidth={true}
          multiline={true}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button className={styles.addComment} variant="outlined" type="submit">
          Add comment
        </Button>
      </form>
      <List>
        {blog.comments.map((comment, index) => (
          // index as key because comments can have the same content
          <ListItem key={index}>{comment}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Blog;
