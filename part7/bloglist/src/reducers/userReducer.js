import loginService from "../services/login";
import blogService from "../services/blogs";
import { showErrorWithTimeout } from "./notificationReducer";

const loggedUser = "loggedBlogAppUser";

const USER_INIT = "user/init";
const USER_LOGGED_IN = "user/loggedIn";
const USER_LOGGED_OUT = "user/loggedOut";

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(loggedUser);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: USER_INIT, user });
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      dispatch({ type: USER_LOGGED_IN, user });
      window.localStorage.setItem(loggedUser, JSON.stringify(user));
    } catch (error) {
      if (error.response.status === 500) {
        const message =
          "Bloglist is temporarily unavailable, please try again later";
        dispatch(showErrorWithTimeout(message));
      } else if (error.response.status === 401) {
        const message = "Incorrect credentials ❌";
        dispatch(showErrorWithTimeout(message));
      } else {
        console.error(error);
      }
    }
  };
};

export const logoutUser = () => {
  window.localStorage.clear();
  return { type: USER_LOGGED_OUT };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case USER_INIT:
      return action.user;
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
