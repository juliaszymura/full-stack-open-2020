import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmitHandle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

  return (
    <form onSubmit={onSubmitHandle(username, password)}>
      <table>
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input
                type="text"
                value={username}
                name="username"
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                value={password}
                name="password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmitHandle: PropTypes.func.isRequired,
};

export default LoginForm;
