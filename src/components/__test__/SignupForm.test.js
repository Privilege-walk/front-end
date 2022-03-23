// Validate input data before sending. if invalid post request should not be sent.
// username: field cannot be empty.
// password: field cannot be empty. has to be more than 8 characters
// first_name: field cannot be empty.
// Last name: field cannot be empty.
// Email: field cannot be empty, has to have @ sign.


// successful creation. should show some output on the frontend.
// username exists
// Email exists.
import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import MockAdapter from "axios-mock-adapter";
import SignupForm from '../SignupForm';
import { getBaseUrl } from "../../functions";

jest.mock("react-router-dom", () => ({Navigate: () => "Navigate"}))

const setup = () => {
    let utils;
    const handleSubmit = jest.fn();
    act (() => {
        utils = render(<SignupForm onSubmit={handleSubmit} />);
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
        handleSubmit,
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
    const { inputs, data, signupBtn, errDiv, handleSubmit } = utils;
    let formData = {};

    for(let key of Object.keys(inputs)){
        formData[key] = data[key]["value"];
        fireEvent.change(inputs[key], {target: {value: data[key]["value"]}});
    }

    expect(errDiv).toHaveTextContent("");
    await act(async () => {   
        await fireEvent.click(signupBtn);
    });
    expect(errDiv).toHaveTextContent("");
    expect(handleSubmit).toHaveBeenCalledWith(formData);
})

