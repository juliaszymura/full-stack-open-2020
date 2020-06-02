import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name}: {props.part.excersises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((element) => (
        <Part key={element.name} part={element} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const excersises = props.parts.map((element) => element.excersises);
  return <p>Number of excersises: {excersises.reduce((a, b) => a + b, 0)}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excersises: 10,
      },
      {
        name: "Using props to pass data",
        excersises: 7,
      },
      {
        name: "State of a component",
        excersises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
