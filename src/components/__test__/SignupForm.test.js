import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignupForm from '../SignupForm';

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useNavigate: () => mockedUsedNavigate,
}))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockSignUpUser = jest.fn();
jest.mock('../../Store/actions', () => ({
    signupUser: () => mockSignUpUser
}));

const setup = () => {
    let utils;
    const store = mockStore({
        signupUser: mockSignUpUser
    });
    act (() => {
        utils = render(
            <Provider store={store}>
                <SignupForm />
            </Provider>
        );
    }); 
    let data = {
        "username": { "value": "user1", "label": "Username" },
        "password": { "value": "password1", "label": "Password" },
        "firstName": { "value": "password", "label": "First Name" },
        "lastName": { "value": "Doe", "label": "Last Name" },
        "email":{ "value": "jane.doe@privilegewalk.com", "label": "Email" },
    }
    let inputs = {};
    for(let key of Object.keys(data)){
        inputs[key] = screen.getByLabelText(data[key]["label"]);
    }
    const signupBtn = screen.getByText('Sign Up', {selector: 'button'});
    const errDiv = screen.getByTestId('signupErrorId');
    return {
        data,
        inputs,
        signupBtn,
        errDiv,
        ...utils
    }
}

test('renders without crashing',  ()=> {
    const utils = setup(); 
    const { asFragment, inputs } = utils;
    expect(asFragment()).toMatchSnapshot();
    for(let key of Object.keys(inputs)){
        expect(inputs[key].value).toBe('');
    }
});

test('Successful sign up', async () => {
    const utils = setup(); 
    const { inputs, data, signupBtn, errDiv } = utils;
    let formData = {};

    for(let key of Object.keys(inputs)){
        formData[key] = data[key]["value"];
        fireEvent.change(inputs[key], {target: {value: data[key]["value"]}});
    }

    mockSignUpUser.mockReturnValueOnce({payload: {created: "success"}})
    expect(errDiv).toHaveTextContent("");
    await act(async () => {   
        await fireEvent.click(signupBtn);
    });
    expect(errDiv).toHaveTextContent("");
    expect(mockSignUpUser).toHaveBeenCalled();
});

test('Unsuccessful sign up', async () => {
    const utils = setup(); 
    const {signupBtn, errDiv } = utils;

    expect(errDiv).toHaveTextContent("");
    await act(async () => {   
        await fireEvent.click(signupBtn);
    });
    expect(errDiv).toHaveTextContent("");
});

