import React from "react";

const Filter = ({ onChangeHandle }) => {
  return (
    <>
      <p>
        Find countries: <input onChange={onChangeHandle} />
      </p>
    </>
  );
};

export default Filter;
