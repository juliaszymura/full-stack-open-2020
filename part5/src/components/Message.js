import React from "react";
import PropTypes from "prop-types";

const Message = ({ message, isError }) => {
  const baseStyle = {
    backgroundColor: "#282c34",
    fontSize: 24,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  };
  const style = isError
    ? { ...baseStyle, color: "red", borderColor: "red" }
    : { ...baseStyle, color: "green", borderColor: "green" };

  return (
    <div className={"message"} style={style}>
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Message;
