import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  notification: notificationReducer,
  users: usersReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
