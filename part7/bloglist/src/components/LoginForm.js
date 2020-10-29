import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (username, password) => async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

  return (
    <div>
      <Typography variant="h1">Log in</Typography>
      <form onSubmit={handleLogin(username, password)}>
        <div>
          <TextField
            label="username"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          ></TextField>
        </div>
        <div>
          <TextField
            type="password"
            label="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          ></TextField>
        </div>
        <Button type="submit" color="primary" id="login-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
