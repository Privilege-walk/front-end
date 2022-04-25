import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import ResultsPage from '../Walk/ResultsPage';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router from "react-router-dom";
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedUsedNavigate = jest.fn();
const mockedUsedParams = jest.fn();
const mockFetchAnswerStats = jest.fn();
const mockFetchEventStats = jest.fn();
const mockUseParams = jest.fn();

jest.mock("react-router-dom", () => ({
    useParams: mockUseParams,
}));
jest.mock('../../Store/actions', () => ({
    fetchAnswerStats: () => mockFetchAnswerStats,
    fetchEventStats: () => mockFetchEventStats
}));
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useNavigate: () => mockedUsedNavigate,
    useParams: () => mockedUsedParams
}))

test('renders without crashing',  () => {
    let utils;
    const store = mockStore({
        token: "token",
    });
    mockFetchAnswerStats.mockReturnValue({payload: {data:[{'question':1}]}});
    mockFetchEventStats.mockReturnValue({payload: {data:{
        'x_label_min':'x_label_min',
        'x_label_max':'x_label_max',
        'data': []
    }}});
    mockUseParams.mockReturnValue({ uniqueCode: '1234' });
    act (() => {
        utils = render( 
            <Provider store={store}>
                <ResultsPage />
            </Provider>
        );
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})