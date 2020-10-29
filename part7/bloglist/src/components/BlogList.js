import { List, ListItem, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { initBlogs } from "../reducers/blogsReducer";

const useStyles = makeStyles({
  list: {
    margin: "1rem 0 0 0rem",
  },
});

const BlogList = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const url = useLocation();
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes)
  );

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  return (
    <List className={styles.list}>
      {blogs.map((blog) => (
        <ListItem
          key={blog.id}
          button
          to={`${url.pathname}blogs/${blog.id}`}
          component={Link}
          name="blog"
        >
          {blog.title + " by " + blog.author}
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
