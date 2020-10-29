import userService from "../services/user";
import { showErrorWithTimeout } from "./notificationReducer";

const USERS_INIT = "users/init";

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({ type: USERS_INIT, users });
    } catch (error) {
      dispatch(showErrorWithTimeout("couldn't get users"));
    }
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case USERS_INIT:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
