import React from "react";

const DisplayCountriesTable = ({ countries, onShowClick }) => {
  return (
    <table>
      <tbody>
        {countries.map((country) => (
          <tr key={country.numericCode}>
            <td>{country.name}</td>
            <td>
              <button onClick={onShowClick(country.name)}>Show</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayCountriesTable;
