import anecdoteService from "../services/anecdotes";

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({ type: "anecdotes/anecdoteAdded", anecdote });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.getAll();
    const newAnecdote = votedAnecdote
      .filter((anecdote) => id === anecdote.id)
      .map((anecdote) => ({ ...anecdote, votes: anecdote.votes + 1 }))
      .pop();
    await anecdoteService.update(id, newAnecdote);
    dispatch({ type: "anecdotes/anecdoteVoted", id });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "anecdotes/anecdoteInit", anecdotes });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "anecdotes/anecdoteAdded":
      return state.concat(action.anecdote);
    case "anecdotes/anecdoteVoted":
      return state.map((anecdote) =>
        anecdote.id !== action.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    case "anecdotes/anecdoteInit":
      return action.anecdotes;
    default:
      return state;
  }
};

export default anecdoteReducer;
