export const showNotification = (content, id) => {
  return {
    type: "notification/shown",
    content,
    id,
  };
};

export const clearNotification = (id) => {
  return { type: "notification/cleared", id };
};

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    const id = Math.floor(Math.random() * 100);
    dispatch(showNotification(content, id));
    setTimeout(() => dispatch(clearNotification(id)), timeout * 1000);
  };
};

const notificationReducer = (state = { content: "", id: null }, action) => {
  switch (action.type) {
    case "notification/shown":
      return { content: action.content, id: action.id };
    case "notification/cleared":
      return state.id === action.id ? { content: "", id: null } : state;
    default:
      return state;
  }
};

export default notificationReducer;
