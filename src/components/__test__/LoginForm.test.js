import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import MockAdapter from "axios-mock-adapter";
import LoginForm from '../LoginForm';

jest.mock("react-router-dom", () => ({Navigate: () => "Navigate"}))

const setup = () => {
    let utils;
    act (() => {
        utils = render(<LoginForm />);
    }) 
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitBtn = screen.getByText('Login', {selector: 'button'});
    const errDiv = screen.getByTestId('loginErrorId');
    return {
        usernameInput,
        passwordInput,
        submitBtn,
        errDiv,
        ...utils
    }
}
test('renders without crashing',  ()=> {
    const utils = setup(); 
    const { asFragment, usernameInput, passwordInput } = utils;
    expect(asFragment()).toMatchSnapshot();
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
});

test('Successful login',  async ()=> {
    const utils = setup(); 
    const { usernameInput, passwordInput, submitBtn, errDiv } = utils;
    const username = "user";
    const password = "password"
    var mock = new MockAdapter(axios);
    mock.onPost(
        'http://localhost:8000/auth/login/', 
        {username,  password}
    ).reply(200, {status: true, token: "token"});
    
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(usernameInput, {target: {value: username}});
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(passwordInput, {target: {value: password}});
    expect(submitBtn).toHaveProperty('disabled', false);
    
    expect(errDiv).toHaveTextContent("");
    await act(async () => {   
        await fireEvent.click(submitBtn);
    });
    expect(errDiv).toHaveTextContent("");
    
});

test('Failed login', async () => {
    const utils = setup(); 
    const { usernameInput, passwordInput, submitBtn, errDiv } = utils;
    const username = "user";
    const password = "password";
    var mock = new MockAdapter(axios);
    mock.onPost(
        'http://localhost:8000/auth/login/', 
        {username,  password}
    ).reply(200, {status: false});
    
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(usernameInput, {target: {value: username}});
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(passwordInput, {target: {value: password}});
    expect(submitBtn).toHaveProperty('disabled', false);
    
    expect(errDiv).toHaveTextContent("");
    await act(async () => {
        await fireEvent.click(submitBtn);
    });
    const errMessage = "Please check your username or password!";
    expect(errDiv).toHaveTextContent(errMessage);
    
});