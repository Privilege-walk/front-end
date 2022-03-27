import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Questions from '../Questions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedUsedLocation = jest.fn();
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useLocation: () => mockedUsedLocation(),
}))


// Snapshot test
const setup = () => {
    let utils;
    const store = mockStore({
        token: "token"
    });
    mockedUsedLocation.mockReturnValue({state: {id: 1, name: "New Event"}});
    act (() => {
        utils = render(
            <Provider store={store}>
                <Questions />
            </Provider>
        );
    });

    const addQuestionInput = screen.getByLabelText('Add New Question');
    const addOptionInput = screen.getByPlaceholderText("Option Description");
    const addPointsInput = screen.getByPlaceholderText("Option Points");
    const addOptionBtn = screen.getByText("Add", {selector: "button"});
    const addQuestionBtn = screen.getByText("Create Question", {selector: "button"});

    return {
        addQuestionInput,
        addOptionInput,
        addPointsInput,
        addOptionBtn,
        addQuestionBtn,
        ...utils
    }
}

test("renders Question page without crashing", () => {
    let utils = setup();
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
});

test("create question successfully", async () => {
    let utils = setup();
    const { 
        addQuestionInput,
        addOptionInput,
        addPointsInput,
        addOptionBtn,
        addQuestionBtn,
    } = utils;
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    expect(addOptionBtn).toHaveProperty('disabled', true);

    fireEvent.change(addQuestionInput, {target: {value: "Question 1?"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    fireEvent.change(addOptionInput, {target: {value: "option 1"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(addPointsInput, {target: {value: "+1"}});
    expect(addOptionBtn).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(addOptionBtn);
    });

    expect(addQuestionBtn).toHaveProperty('disabled', false);

    await act(async () => {   
        await fireEvent.click(addQuestionBtn);
    });


})



// Test happy path
// add a new question.
// Add an option. 
// Add another option. 
//  create question. 

// add a new question.
// Add an option. 
// Add another option. 
// Edit created option.
// Delete option.

// Check that you can't create a question.
// Can only create question after creating more than two options.


