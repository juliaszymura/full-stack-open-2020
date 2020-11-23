import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

interface CourseName {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "React with TypeScript";
  exerciseCount: number;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

interface CourseParts {
  courses: CoursePart[];
}

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
  {
    name: "React with TypeScript",
    exerciseCount: 78,
    description: "The best part",
  },
];

const Header: React.FC<CourseName> = ({ name }: CourseName) => {
  return <h1>{name}</h1>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<CoursePart> = (part: CoursePart) => {
  let rendered = <></>;

  switch (part.name) {
    case "Fundamentals":
      rendered = (
        <p>
          <strong>{part.name}</strong> <br />
          exercise count: {part.exerciseCount}
          <br />
          description: {part.description}
        </p>
      );
      break;
    case "Deeper type usage":
      rendered = (
        <p>
          <strong>{part.name}</strong> <br />
          exercise count: {part.exerciseCount}
          <br />
          description: {part.description} <br />
          exercise submission link:{" "}
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </p>
      );
      break;
    case "Using props to pass data":
      rendered = (
        <p>
          <strong>{part.name}</strong> <br />
          exercise count: {part.exerciseCount}
          <br />
          group project count: {part.groupProjectCount}
        </p>
      );
      break;
    case "React with TypeScript":
      rendered = (
        <p>
          <strong>{part.name}</strong> <br />
          exercise count: {part.exerciseCount} <br />
          description: {part.description}
        </p>
      );
      break;
    default:
      assertNever(part);
  }
  return rendered;
};

const Content: React.FC<CourseParts> = ({ courses }: CourseParts) => {
  return (
    <>
      {courses.map((course, i) => (
        <Part key={i} {...course} />
      ))}
    </>
  );
};

const Total: React.FC<CourseParts> = ({ courses }: CourseParts) => {
  return (
    <p>
      <strong>
        Number of exercises:{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
