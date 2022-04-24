import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import EventReults from '../../components/Walk/ResultsPage';
import eventResults from '../../api/mockData/event';
import questionAnswers from '../../api/mockData/questions';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { test } from "@jest/globals";
var middlewares = [thunk]
var mockStore = configureMockStore(middlewares)


var mockFetchEventStats = jest.fn();
var mockFetchAnswerStats = jest.fn();

var mockUseParams = jest.fn().mockReturnValue({eventId:1, uniqueCode: "host"});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({eventId:1, uniqueCode: "host"}),
}));

afterEach(jest.clearAllMocks);


const setup = ({uniqueCode, eventId}) => {
    let utils;
    mockUseParams.mockReturnValue({uniqueCode, eventId});
    const store = mockStore({
        fetchEventStats: mockFetchEventStats,
        fetchAnswerStats: mockFetchAnswerStats
    });
    mockFetchEventStats.mockReturnValueOnce = {
        action: {
            payload: { data: eventResults}
        }
    }
    mockFetchAnswerStats.mockReturnValueOnce = {
        action: {
            payload: { data: questionAnswers}
        }
    }
    act (() => {
        utils = render(
        <Provider store={store}>
            <EventReults />
        </Provider>
        );
    })    
    return { ...utils };
}

test('render participant page results', () => {
    const params = { uniqueCode : "PH123", eventId: "1" }
    const utils = setup(params); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
});


test('render Host page results', () => {
    const params = { uniqueCode : "host", eventId: "1"}
    const utils = setup(params); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
});

