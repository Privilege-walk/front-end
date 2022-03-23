import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import {Label, Button, FormGroup, Input} from 'reactstrap';

import axios from 'axios';
import { Navigate } from "react-router-dom";
import "./App.css";
import { getBaseUrl } from "../functions";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  // function getBaseUrl() {
  //   if(window.location.href.includes('localhost') === true) {
  //     return `http://localhost:8000`;
  //   }
  //   return `https://privilegewalkbe.herokuapp.com`;
  // }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(getBaseUrl(window) + `/auth/login/`, { username, password })
      .then(async res => {
        if (res.data.status === true) {
            setLogin(true);
        } else {
            setErrMsg("Please check your username or password!");
        }
      });
  }

  return (
    <div className="Form">
      <Form onSubmit={handleSubmit}>
        <FormGroup size="lg" id="username">
          <Label htmlFor="username-input">
            Username
          </Label>
          <Input
              autoFocus
              id="username-input"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          
        </FormGroup>
        <FormGroup size="lg" id="password">
          <Label htmlFor="password-input">Password</Label>
          <Input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button size="lg" type="submit" 
          disabled={!validateForm()}
        >
          Login
        </Button>
        <div data-testid="loginErrorId" className="errMsg">{errMsg}</div>
      </Form>
      {
          login &&
          <Navigate to="/loggedin" />
      }
    </div>
  );
}