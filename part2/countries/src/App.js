import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Display from "./components/Display";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const handleFilterChange = (event) => setCountryFilter(event.target.value);
  const handleShowClick = (countryName) => () => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
      .then((response) => setCountries(response.data));
  };

  const updateCountries = () => {
    if (countryFilter !== "")
      axios
        .get(`https://restcountries.eu/rest/v2/name/${countryFilter}`)
        .then((response) => setCountries(response.data))
        .catch((error) => console.log(error.message));
  };

  useEffect(updateCountries, [countryFilter]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Country info and weather</h1>
        <Filter onChangeHandle={handleFilterChange} />
        <Display countries={countries} onShowClick={handleShowClick} />
      </header>
    </div>
  );
};

export default App;
