import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserLiveEvent from '../Walk/UserLiveEvent';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockFetchQuestions = jest.fn();
const mockRegisterParticipant = jest.fn();
const mockUseParams = jest.fn();
const mockGetWebSocketBaseUrl = jest.fn();
const mockUseWebSocket = jest.fn();
const mockSendJsonMessage = jest.fn();
jest.mock('../../Store/actions', () => ({
    fetchQuestions: () => mockFetchQuestions,
    registerParticipant: () => mockRegisterParticipant
}));
jest.mock("react-router-dom", () => ({
    useParams: () => mockUseParams(),
}))
jest.mock("react-use-websocket", () => {
    // // sendJsonMessage: () => mockSendJsonMessage,
    // useWebSocket: {"sendJsonMessage":mockSendJsonMessage},
    return jest.fn().mockImplementation(() => {
        return {useWebSocket: {"sendJsonMessage": mockSendJsonMessage}};
    });
})
jest.mock("../../api/functions", () => ({
    getWebSocketBaseUrl: () => mockGetWebSocketBaseUrl(),
}))


jest.mock("../Walk/LandingPage", () => ({ goNextPage }) => (
    <div>
        <button onClick={() => goNextPage(1)} data-testid="set-page-index-l">
            Set Page Index
        </button>
    </div>
));
jest.mock("../Walk/Questions", () => ({ setAnswers, goNextPage }) => (
    <div>
        <button onClick={() => goNextPage(2)} data-testid="set-page-index-q">
            Set Page Index
        </button>
        <button onClick={() => setAnswers({'1': 1})} data-testid="set-answer-1">
            Answer1
        </button>
        <button onClick={() => setAnswers({'1': 2})} data-testid="set-answer-2">
            Answer2
        </button>
    </div>
));

const setup = async (numQuestions=0) => {
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
    mockRegisterParticipant.mockReturnValue({
        payload: {eventId:1, status: "registered", participantCode:'ABCXYZ'}
    });
    mockUseParams.mockReturnValue({"eventId": 1});
    mockSendJsonMessage.mockReturnValue();
    mockGetWebSocketBaseUrl.mockReturnValue("ws://localhost:8000");
    await act (async () => {
        utils = render(
            <Provider store={store}>
                <UserLiveEvent
                    fetchQuestions={mockFetchQuestions}
                    registerParticipant={mockRegisterParticipant}
                />
            </Provider>
        );
    });

    return {
        ...utils
    }
}

afterEach(jest.clearAllMocks);

test('renders without crashing', async () => {
    let utils = await setup();
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})

test('moves to questions page', async () => {
    let utils = await setup(1);
    const setPageBtn = screen.getByTestId("set-page-index-l", {selector: "button"});
    expect(screen.queryByTestId('set-page-index-q')).toEqual(null);
    await act(async () => {   
        await fireEvent.click(setPageBtn);
    });
    expect(screen.getByTestId('set-page-index-q')).toBeVisible();
})

// test('able to submit answer', async () => {
//     let questions = [];
//     for (let i = 0; i < numQuestions; i++){
//         questions.push({
//             id: i,
//             description: "Question " + i,
//             choices: [
//                 { id: 876, description: "Pizza", value: 1 },
//                 { id: 54, description: "Ice Cream", value: 2 }
//             ]
//         });
//     }
//     mockFetchQuestions.mockReturnValue({payload: {questions}});
//     mockRegisterParticipant.mockReturnValue({
//         payload: {eventId:1, status: "registered", participantCode:'ABCXYZ'}
//     });
//     mockUseParams.mockReturnValue({"eventId": 1});
//     mockSendJsonMessage.mockReturnValue();
//     mockGetWebSocketBaseUrl.mockReturnValue("ws://localhost:8000");



//     let utils = await setup(1);
//     const setPageBtn = screen.getByTestId("set-page-index-l", {selector: "button"});
//     expect(screen.queryByTestId('set-page-index-q')).toEqual(null);
//     await act(async () => {   
//         await fireEvent.click(setPageBtn);
//     });
//     expect(screen.getByTestId('set-page-index-q')).toBeVisible();

//     console.log("HAHAHAHAHAHAHAHAHAHA: ",utils.instance);

//     // const answer1Btn = screen.getByTestId("set-answer-1", {selector: "button"});
//     // await act(async () => {   
//     //     await fireEvent.click(answer1Btn);
//     // });
// })