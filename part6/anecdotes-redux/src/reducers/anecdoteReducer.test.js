import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("Anecdotes reducer", () => {
  const anecdote = "Everything is easy unless you need to do it yourself";

  test("Anecdote can be added", () => {
    const action = {
      type: "anecdotes/anecdoteAdded",
      anecdote: {
        content: anecdote,
        votes: 0,
        id: 1337,
      },
    };
    const state = [];

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0]).toHaveProperty("content", anecdote);
    expect(newState[0]).toHaveProperty("id");
    expect(newState[0]).toHaveProperty("votes", 0);
  });

  test("Anecdote can be voted", () => {
    const action = { type: "anecdotes/anecdoteVoted", id: 1337 };
    const state = [{ content: anecdote, votes: 0, id: 1337 }];

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0]).toHaveProperty("content", anecdote);
    expect(newState[0]).toHaveProperty("id");
    expect(newState[0]).toHaveProperty("votes", 1);
  });
});
