import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const useStyles = makeStyles(() => ({
  root: {},
  greeting: {
    marginLeft: "auto",
    marginRight: "0.5em",
  },
}));

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" to={"/"} component={Link}>
            Blogs
          </Button>
          <Button color="inherit" to={"/users"} component={Link}>
            Users
          </Button>
          <Typography className={styles.greeting} variant="h6">
            Hello {user.name}! 🖖 🙋‍♀️ 👋{" "}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
