import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => setResources(resources.concat(response.data)))
      .catch((error) => console.log(error));
  };

  const getAll = useCallback(() => {
    axios
      .get(baseUrl)
      .then((response) => setResources(response.data))
      .catch((error) => console.log(error));
  }, [baseUrl]);

  useEffect(() => getAll(), [getAll]);

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...content} />
            <button>create</button>
          </form>
          {notes.map((n) => (
            <p key={n.id}>{n.content}</p>
          ))}

          <h2>persons</h2>
          <form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br />
            number <input {...number} />
            <button>create</button>
          </form>
          {persons.map((n) => (
            <p key={n.id}>
              {n.name} {n.number}
            </p>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
