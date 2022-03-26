import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {Label, Button, FormGroup, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { loginUser } from "../Store/actions";

function LoginForm({token, loginUser,setFirstPage}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const action = await loginUser({username, password});
    if (action.payload.token){
      setLogin(true);
      navigate("/events");
    }else{
      setErrMsg("Please check your username or password!");
    }
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
          token &&
          <Navigate to="/events" />
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps ={
  loginUser
};

var LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;