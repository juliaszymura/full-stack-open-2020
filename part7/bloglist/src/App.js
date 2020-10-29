import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { initUser } from "./reducers/userReducer";
import UserList from "./components/UserList";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import UserDetails from "./components/UserDetails";
import Blog from "./components/Blog";
import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h2: {
        margin: "1rem",
      },
      h4: {
        margin: "1rem",
      },
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification.content);

  const blogFormRef = useRef();

  // log in user from local storage
  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  const blogListView = () => {
    return (
      <>
        <Typography variant="h2">Blogs</Typography>
        <Togglable buttonLabel={"Add a blog"} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <BlogList />
      </>
    );
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div>
          <header>
            {user && <Menu />}
            {notification && <Notification />}
          </header>
        </div>
        <header>
          <Switch>
            <Route exact path="/">
              {user === null ? <LoginForm /> : blogListView()}
            </Route>
            <Route exact path="/users">
              {user === null ? <LoginForm /> : <UserList />}
            </Route>
            <Route path="/users/:id">
              {user === null ? <LoginForm /> : <UserDetails />}
            </Route>
            <Route path="/blogs/:id">
              {user === null ? <LoginForm /> : <Blog />}
            </Route>
          </Switch>
        </header>
      </ThemeProvider>
    </Container>
  );
};

export default App;
