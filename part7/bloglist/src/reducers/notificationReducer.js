const NOTIFICATION_ERROR_SHOWN = "notification/errorShown";
const NOTIFICATION_SUCCESS_SHOWN = "notification/successShown";
const NOTIFICATION_CLEARED = "notification/successCleared";
const TIMEOUT = 5000;

const generateId = () => Math.floor(Math.random() * 10000);

const showErrorNotification = (content, id) => {
  return { type: NOTIFICATION_ERROR_SHOWN, content, id };
};

const showSuccessNotification = (content, id) => {
  return { type: NOTIFICATION_SUCCESS_SHOWN, content, id };
};

const showNotificationWithTimeout = (dispatch, content, actionCreator) => {
  const id = generateId();
  dispatch(actionCreator(content, id));
  setTimeout(() => dispatch(clearNotification(id)), TIMEOUT);
};

export const showErrorWithTimeout = (content) => {
  return async (dispatch) =>
    showNotificationWithTimeout(dispatch, content, showErrorNotification);
};

export const showSuccessWithTimeout = (content) => {
  return async (dispatch) =>
    showNotificationWithTimeout(dispatch, content, showSuccessNotification);
};

const clearNotification = (id) => ({
  type: NOTIFICATION_CLEARED,
  id,
});

const notificationReducer = (
  state = { content: null, isError: false, id: null },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_ERROR_SHOWN:
      return { content: action.content, id: action.id, isError: true };
    case NOTIFICATION_SUCCESS_SHOWN:
      return { content: action.content, id: action.id, isError: false };
    case NOTIFICATION_CLEARED:
      return state.id === action.id
        ? { id: null, content: null, isError: false }
        : state;
    default:
      return state;
  }
};

export default notificationReducer;
