import React, { useState } from "react";
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { useField } from "./hooks";
import logo from "./logo.svg";
import "./App.css";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create new
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>Has {anecdote.votes} votes</div>
      <div>For more info see: {anecdote.info}</div>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const resetFields = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  const createFieldWithoutResetFromArray = (arr) =>
    arr.map((field) => {
      const { reset, ...input } = field;
      return input;
    });

  const [
    contentInput,
    authorInput,
    infoInput,
  ] = createFieldWithoutResetFromArray([content, author, info]);

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...contentInput} />
        </div>
        <div>
          Author
          <input {...authorInput} />
        </div>
        <div>
          Url for more info
          <input {...infoInput} />
        </div>
        <button type="submit">Create</button>
        <button onClick={resetFields}>Reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} added!`);
    setTimeout(() => setNotification(""), 10000);
  };

  // I'm afraid the course author forgot to delete these
  //
  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  //
  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };
  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          <h3>{notification}</h3>
          <Switch>
            <Route path={"/create"}>
              <CreateNew addNew={addNew} />
            </Route>
            <Route path={"/about"}>
              <About />
            </Route>
            <Route path={"/anecdotes/:id"}>
              <Anecdote anecdote={anecdote} />
            </Route>
            <Route path={"/"}>
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default App;
