import React from "react";
import DisplayCountry from "./DisplayCountry";
import DisplayCountriesTable from "./DisplayCountryTable";

const Display = ({ countries, onShowClick }) => {
  if (countries.length > 10)
    return <p>Too many matches, provide more specific filter</p>;
  else if (countries.length === 1) {
    return <DisplayCountry country={countries[0]} />;
  }
  return (
    <DisplayCountriesTable countries={countries} onShowClick={onShowClick} />
  );
};

export default Display;
