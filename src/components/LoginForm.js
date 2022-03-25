import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import {Label, Button, FormGroup, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import "./App.css";
import { restClient } from "../api/rest_interceptor";

function LoginForm({storeAuthToken,setFirstPage}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    restClient.post(`/auth/login/`, { username, password })
      .then(async res => {
        if (res.data.status === true) {
            setLogin(true);
            localStorage.setItem("token", res.data.token);
            storeAuthToken(res.data.token);
        } else {
            setErrMsg("Please check your username or password!");
        }
      });
  }

  function onSignUp() {
    setFirstPage('signup');
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
        <Button size="lg"
          style={{marginLeft: 20}}
          onClick={onSignUp}
        >
          Sign Up
        </Button>
        <div data-testid="loginErrorId" className="errMsg">{errMsg}</div>
      </Form>
      {
          login &&
          <Navigate to="/events" />
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeAuthToken: (authToken) => dispatch({ type: 'STORE_TOKEN', payload: authToken })
  }
};

var LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;