import React from "react";

const DisplayCountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      {country.languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
      <img src={country.flag} alt="flag" />
      <h3>Weather in {country.capital}</h3>
    </>
  );
};

export default DisplayCountryInfo;
