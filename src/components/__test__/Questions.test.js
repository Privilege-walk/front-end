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

const mockCreateQuestion = jest.fn();
const mockFetchQuestions = jest.fn();
const mockedUsedLocation = jest.fn();
jest.mock('../../Store/actions', () => ({
    createQuestion: () => mockCreateQuestion,
    fetchQuestions: () => mockFetchQuestions
}));
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useLocation: () => mockedUsedLocation(),
}))


// Snapshot test
const setup = (numQuestions=0) => {
    let utils;
    const store = mockStore({
        token: "token"
    });
    let questions = [];
    for (let i = 0; i < numQuestions; i++){
        questions.push({
            id: i,
            description: "Question " + i,
            choices: [
                { id: 876, description: "Pizza", value: 1 },
                { id: 54, description: "Ice Cream", value: 2 }
            ]
        });
    }
    mockFetchQuestions.mockReturnValue({payload: {questions}});
    mockCreateQuestion.mockReturnValue({
        payload: {status: "created", newQuestion: "", optionsList: [], newOptionId: 0}
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
    let utils = setup(1);
    const { 
        addQuestionInput,
        addQuestionBtn,
    } = utils;
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', true);

    fireEvent.change(addQuestionInput, {target: {value: "Question 1?"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    fireEvent.change(screen.getByTestId('new-option-desc-0'), {target: {value: "option 1"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-0'), {target: {value: "+1"}});
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-0'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', true);

    fireEvent.change(screen.getByTestId('new-option-desc-1'), {target: {value: "option 2"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-1'), {target: {value: "-1"}});
    expect(screen.getByTestId('add-1')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-1'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', false);
    
    await act(async () => {
        await fireEvent.click(addQuestionBtn);
    });

    expect(addQuestionInput.value).toEqual("");
    expect(screen.getByTestId('new-option-desc-0').value).toEqual("");
    expect(screen.getByTestId('new-option-points-0').value).toEqual("");
})

test("check edit and delete options", async () => {
    let utils = setup();
    const { 
        addQuestionInput,
        addQuestionBtn,
    } = utils;
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', true);

    fireEvent.change(addQuestionInput, {target: {value: "Question 1?"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    fireEvent.change(screen.getByTestId('new-option-desc-0'), {target: {value: "option 1"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-0'), {target: {value: "+1"}});
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-0'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', true);

    fireEvent.change(screen.getByTestId('new-option-desc-1'), {target: {value: "option 2"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-1'), {target: {value: "-1"}});
    expect(screen.getByTestId('add-1')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-1'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', false);

    await act(async () => {   
        await fireEvent.click(screen.getByTestId('delete-1'));
    });
    expect(addQuestionBtn).toHaveProperty('disabled', true);

    expect(screen.getByTestId('new-option-desc-0').disabled).toEqual(true);
    await act(async () => {
        await fireEvent.click(screen.getByTestId('edit-0'));
    });
    expect(screen.getByTestId('new-option-desc-0').disabled).toEqual(false);

    await act(async () => {
        await fireEvent.click(screen.getByTestId('add-0'));
    });
    expect(screen.getByTestId('new-option-desc-0').disabled).toEqual(true);
})

test("create question failed", async () => {
    let utils = setup();
    const { 
        addQuestionInput,
        addQuestionBtn,
    } = utils;
    mockCreateQuestion.mockReturnValue({
        payload: {errors: "error"}
    });
    mockFetchQuestions.mockReturnValue({payload: {questions:[]}});

    expect(addQuestionBtn).toHaveProperty('disabled', true);
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', true);

    fireEvent.change(addQuestionInput, {target: {value: "Question 1?"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    fireEvent.change(screen.getByTestId('new-option-desc-0'), {target: {value: "option 1"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-0'), {target: {value: "+1"}});
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-0'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', true);

    fireEvent.change(screen.getByTestId('new-option-desc-1'), {target: {value: "option 2"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-1'), {target: {value: "-1"}});
    expect(screen.getByTestId('add-1')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-1'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', false);
    
    await act(async () => {
        await fireEvent.click(addQuestionBtn);
    });
    expect(addQuestionInput.value).not.toEqual("");
})

test("fetch questions empty list", async () => {
    let utils = setup();
    const { 
        addQuestionInput,
        addQuestionBtn,
    } = utils;
    mockCreateQuestion.mockReturnValue({
        payload: {errors: "error"}
    });
    mockFetchQuestions.mockReturnValue({payload: {questions:[]}});

    expect(addQuestionBtn).toHaveProperty('disabled', true);
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', true);

    fireEvent.change(addQuestionInput, {target: {value: "Question 1?"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    fireEvent.change(screen.getByTestId('new-option-desc-0'), {target: {value: "option 1"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-0'), {target: {value: "+1"}});
    expect(screen.getByTestId('add-0')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-0'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', true);

    fireEvent.change(screen.getByTestId('new-option-desc-1'), {target: {value: "option 2"}});
    expect(addQuestionBtn).toHaveProperty('disabled', true);
    
    fireEvent.change(screen.getByTestId('new-option-points-1'), {target: {value: "-1"}});
    expect(screen.getByTestId('add-1')).toHaveProperty('disabled', false);
    await act(async () => {   
        await fireEvent.click(screen.getByTestId('add-1'));
    });

    expect(addQuestionBtn).toHaveProperty('disabled', false);
    
    await act(async () => {
        await fireEvent.click(addQuestionBtn);
    });
    expect(addQuestionInput.value).not.toEqual("");
})