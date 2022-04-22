import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import ResultsPage from '../Walk/ResultsPage';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedUsedNavigate = jest.fn();
const mockedUsedParams = jest.fn();

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