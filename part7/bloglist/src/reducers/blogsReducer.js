import blogService from "../services/blogs";
import {
  showErrorWithTimeout,
  showSuccessWithTimeout,
} from "./notificationReducer";

const BLOGS_ADDED = "blogs/added";
const BLOGS_INIT = "blogs/init";
const BLOGS_DELETED = "blogs/deleted";
const BLOGS_LIKED = "blogs/liked";
const BLOGS_COMMENTED = "blogs/commented";

const handleCommunicationFail = (error, dispatch) => {
  console.error(error);
  const message = "Something went terribly wrong 💢 Please try again later";
  dispatch(showErrorWithTimeout(message));
};

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({ type: BLOGS_INIT, blogs });
    } catch (error) {
      handleCommunicationFail(error, dispatch);
    }
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(blog);
      dispatch({ type: BLOGS_ADDED, blog: savedBlog });
    } catch (error) {
      handleCommunicationFail(error, dispatch);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({ type: BLOGS_DELETED, id });
    } catch (error) {
      handleCommunicationFail(error, dispatch);
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      // unfortunately backend doesn't update likes on it's own
      const blogs = await blogService.getAll();
      const blog = blogs.find((blog) => blog.id === id);
      const likes = blog.likes + 1;
      const blogToUpdate = { ...blog, likes };
      await blogService.update(id, blogToUpdate);
      dispatch({ type: BLOGS_LIKED, id, likes });
    } catch (error) {
      handleCommunicationFail(error, dispatch);
    }
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.comment(id, comment);
      dispatch(showSuccessWithTimeout("Comment added"));
      dispatch({ type: BLOGS_COMMENTED, blog: blog.data });
    } catch (error) {
      handleCommunicationFail(error, dispatch);
    }
  };
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case BLOGS_INIT:
      return action.blogs;
    case BLOGS_ADDED:
      return state.concat(action.blog);
    case BLOGS_DELETED:
      return state.filter((blog) => blog.id !== action.id);
    case BLOGS_LIKED:
      return state.map((blog) =>
        blog.id === action.id ? { ...blog, likes: action.likes } : blog
      );
    case BLOGS_COMMENTED:
      return state.map((blog) =>
        blog.id === action.blog.id ? action.blog : blog
      );
    default:
      return state;
  }
};

export default blogsReducer;
