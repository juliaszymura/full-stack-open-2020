import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MostVoted = ({ votes, anecdotes }) => {
  const mostVotedIdx = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  return (
    <>
      <p>
        Anecdote with most votes:
        <br></br>
        {anecdotes[mostVotedIdx]}
      </p>
    </>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [votes, setVotes] = useState(new Array(6).fill(0));

  const selectNewAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1));
  };

  const vote = (idx) => () => {
    let newVotes = [...votes];
    newVotes[idx] += 1;
    setVotes(newVotes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {anecdotes[selected]}
          <br></br>
          This anecdote has {votes[selected]} votes
        </p>
        <div>
          <button className="App-button" onClick={vote(selected)}>
            Vote
          </button>
          <button className="App-button" onClick={selectNewAnecdote}>
            Next anecdote
          </button>
        </div>
        <MostVoted votes={votes} anecdotes={anecdotes} />
      </header>
    </div>
  );
};

export default App;
