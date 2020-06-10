import React from "react";

const Filter = ({ handleFilterChange }) => {
  return (
    <>
      Show results with: <input onChange={handleFilterChange} />
    </>
  );
};

export default Filter;
