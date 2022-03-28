import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useNavigate: () => mockedUsedNavigate,
}))

const mockLoginUser = jest.fn();
jest.mock('../../Store/actions', () => ({
    loginUser: () => mockLoginUser
}));

const setup = () => {
    let utils;
    const store = mockStore({
        loginUser: mockLoginUser,
    });
    act (() => {
        utils = render(
        <Provider store={store}>
            <LoginForm />
        </Provider>
        );
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

    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(usernameInput, {target: {value: username}});
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(passwordInput, {target: {value: password}});
    expect(submitBtn).toHaveProperty('disabled', false);
    
    mockLoginUser.mockReturnValueOnce({payload: {token: "token"}})
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
    
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(usernameInput, {target: {value: username}});
    expect(submitBtn).toHaveProperty('disabled', true);
    fireEvent.change(passwordInput, {target: {value: password}});
    expect(submitBtn).toHaveProperty('disabled', false);
    
    mockLoginUser.mockReturnValueOnce({payload: {token: ""}})
    expect(errDiv).toHaveTextContent("");
    await act(async () => {
        await fireEvent.click(submitBtn);
    });
    const errMessage = "Please check your username or password!";
    expect(errDiv).toHaveTextContent(errMessage);
    
});