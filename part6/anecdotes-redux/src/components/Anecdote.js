import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ content, votes, id }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(voteAnecdote(id));
    const notification = `${content} has been upvoted`;
    dispatch(setNotification(notification, 5));
  };

  return (
    <>
      <div>{content}</div>
      <div>
        Votes: {votes}
        <button onClick={onClickHandler}>Vote</button>
      </div>
    </>
  );
};

Anecdote.propTypes = {
  content: PropTypes.string,
  votes: PropTypes.number,
  id: PropTypes.string,
};

export default Anecdote;
