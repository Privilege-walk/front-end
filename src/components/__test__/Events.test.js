import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Events from '../events';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// const mockLoginUser = jest.fn();
jest.mock('../../Store/actions', () => ({
    loginUser: () => mockLoginUser
}));

const setup = () => {
    let utils;
    const store = mockStore({
        token: "token",
    });
    act (() => {
        utils = render(
        <Provider store={store}>
            <Events />
        </Provider>
        );
    }) 
    const newEventInput = screen.getByLabelText('New Event Name');
    const submitBtn = screen.getByText('Create Event', {selector: 'button'});
    return {  
        newEventInput,
        submitBtn,
        ...utils
    };
}
test ('renders without crashing', () => {
    let utils = setup();
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})