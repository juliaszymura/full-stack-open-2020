// commented out parts are modifications required by exercise 6.20

import React from "react";
// import { useDispatch} from "react-redux";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  //
  //   const AnecdoteForm = () => {
  //    const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const notification = `${content} added`;
    props.addAnecdote(content);
    props.setNotification(notification, 5);
    // dispatch(addAnecdote(content));
    // dispatch(setNotification(notification, 5));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

// export default AnecdoteForm;
export default ConnectedAnecdoteForm;
