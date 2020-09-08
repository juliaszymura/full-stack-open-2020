import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Anecdotes</h1>
        <Filter />
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </header>
    </div>
  );
};

export default App;
