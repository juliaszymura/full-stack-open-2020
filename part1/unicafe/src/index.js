import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClickHandle }) => (
  <button onClick={onClickHandle}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;

  const displayAverage = () => {
    let avg = (good * 1 + neutral * 0 + bad * -1) / all;
    if (Number.isNaN(avg)) return 0;
    return avg;
  };

  const displayPositive = () => {
    let positive = (good / all) * 100;
    if (Number.isNaN(positive)) return "0 %";
    return positive + " %";
  };

  if (all === 0)
    return (
      <>
        <h1>Statistics</h1>
        No feedback given :(
      </>
    );
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />

          <tr>
            <td>
              <br />
            </td>
          </tr>

          <Statistic text="all" value={all} />
          <Statistic text="average" value={displayAverage()} />
          <Statistic text="postive" value={displayPositive()} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addOneGood = () => setGood(good + 1);
  const addOneNeutral = () => setNeutral(neutral + 1);
  const addOneBad = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback please</h1>
      <Button text={"good"} onClickHandle={addOneGood} />
      <Button text={"neutral"} onClickHandle={addOneNeutral} />
      <Button text={"bad"} onClickHandle={addOneBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
