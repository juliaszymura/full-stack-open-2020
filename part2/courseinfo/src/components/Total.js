import React from "react";

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <b>Total of {total} exersises</b>
    </p>
  );
};

export default Total;
