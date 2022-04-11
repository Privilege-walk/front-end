import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Questions from '../Walk/Questions';

const mockedSetAnswers = jest.fn();
const mockedNextQuestion = jest.fn();
var questions = [
    {
        "id": 1,
        "description": "The Question content",
        "choices": [
            {
                "id": 1,
                "description": "Pizza",
                "value": 1
            },
            {
                "id": 2,
                "description": "Ice Cream",
                "value": 2
            },
            {
                "id": 3,
                "description": "Salt Water",
                "value": -1
            }
        ]
    }
];
var props = {
    answers : {'1': 1},
    questions,
    questionIndex: 0,
    setAnswers: mockedSetAnswers,
    eventName: 'eventName',
    activeUsers: 1,
    answeredUsers: 1,
    nextQuestion: mockedNextQuestion,
    userType: 'HOST'
}

afterEach(jest.clearAllMocks);

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <Questions {...props} />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})

test('when participant unselects a choice', async () => {
    let mockProps = {...props, userType:'PARTICIPANT'};
    let utils;
    act (() => {
        utils = render( <Questions {...mockProps} />);
    });
    const choiceBtn = screen.getByTestId("choice1", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(choiceBtn);
    });
    expect(mockedSetAnswers).toHaveBeenCalledTimes(1);
    expect(mockedSetAnswers).toHaveBeenCalledWith({'1': ''});
})

test('when participant selects a choice', async () => {
    let mockProps = {...props, userType:'PARTICIPANT', answers : {}};
    let utils;
    act (() => {
        utils = render( <Questions {...mockProps} />);
    });
    const choiceBtn = screen.getByTestId("choice2", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(choiceBtn);
    });
    expect(mockedSetAnswers).toHaveBeenCalledTimes(1);
    expect(mockedSetAnswers).toHaveBeenCalledWith({'1': 2});
})

test('participant has empty questions list', () => {
    let mockProps = {...props, userType:'PARTICIPANT', questions:[], answers : {}};
    let utils;
    act (() => {
        utils = render( <Questions {...mockProps} />);
    });
    const text = screen.getByTestId("question");
    expect(text.value).toEqual(undefined);
})

test('when host clicks on next question', async () => {
    let mockProps = {...props};
    let utils;
    act (() => {
        utils = render( <Questions {...mockProps} />);
    });
    const nextQuesBtn = screen.getByText("Next Question", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(nextQuesBtn);
    });
    expect(mockedNextQuestion).toHaveBeenCalledTimes(1);
})

test('host has empty questions list', () => {
    let mockProps = {...props, questions:[], answers : {}};
    let utils;
    act (() => {
        utils = render( <Questions {...mockProps} />);
    });
    const text = screen.getByTestId("question");
    expect(text.value).toEqual(undefined);
})