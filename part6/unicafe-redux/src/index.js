import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";
import logo from "./logo.svg";
import "./App.css";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const neutral = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    store.dispatch({
      type: "RESET",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={good}>good</button>
        <button onClick={neutral}>neutral</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <div>good: {store.getState().good}</div>
        <div>neutral: {store.getState().ok}</div>
        <div>bad: {store.getState().bad}</div>
      </header>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
