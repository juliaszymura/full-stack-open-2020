import React from "react";

const Notification = ({ message, isError }) => {
  const defaultStyle = {
    color: "green",
    backgroundColor: "#282c34",
    fontSize: 24,
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  };

  if (message) {
    if (isError) {
      const errorStyle = {
        ...defaultStyle,
        color: "red",
        borderColor: "red",
      };
      return <div style={errorStyle}>{message}</div>;
    }
    return <div style={defaultStyle}>{message}</div>;
  }
  return <></>;
};

export default Notification;
