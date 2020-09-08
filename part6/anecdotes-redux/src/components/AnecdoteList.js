// commented out parts are modifications required by exercise 6.19

import React from "react";
// import { useSelector} from "react-redux"
import { connect } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = (props) => {
  //
  // const AnecdoteList = () => {
  //   const anecdotes = useSelector((state) =>
  //     state.anecdotes
  //       .slice()
  //       .filter((anecdote) =>
  //         anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  //       )
  //   );

  return (
    <>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <Anecdote
              id={anecdote.id}
              votes={anecdote.votes}
              content={anecdote.content}
            />
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
    filter: state.filter,
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList);

// export default AnecdoteList;
export default ConnectedAnecdoteList;
