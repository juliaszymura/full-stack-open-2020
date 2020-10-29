import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

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

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

    axios
      .get(url)
      .then((response) => response.data[0])
      .then((country) => setCountry(country))
      .then(() => setFound(true))
      .catch(() => setFound(false));
  }, [name]);

  return { data: country, found };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>find</button>
        </form>

        <Country country={country} />
      </header>
    </div>
  );
};

export default App;
