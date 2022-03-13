import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import "./App.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:8000/auth/login/`, { username, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data.status === true) {
            setLogin(true);
        } else {
            setErrMsg("Please check your username or password!");
        }
      })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" type="submit" 
          disabled={!validateForm()}
        >
          Login
        </Button>
        <div className="errMsg">{errMsg}</div>
      </Form>
      {
          login &&
          <Navigate to="/loggedin" />
      }
    </div>
  );
}