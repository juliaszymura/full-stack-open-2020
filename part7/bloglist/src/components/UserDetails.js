import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initUsers } from "../reducers/usersReducer";
import { List, ListItem, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    marginLeft: "1rem",
  },
});

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const styles = useStyles();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  // waiting for data
  if (!user) return null;

  return (
    <div>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h4">Added blogs</Typography>
      <List className={styles.list}>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDetails;
