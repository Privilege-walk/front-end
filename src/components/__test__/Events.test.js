import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Events from '../events';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockCreateEvent = jest.fn();
const mockFetchEvents = jest.fn();
jest.mock('../../Store/actions', () => ({
    createEvent: () => mockCreateEvent,
    fetchEvents: () => mockFetchEvents
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
    const newEventError = screen.getByTestId('event-error-text');
    
    return {  
        newEventInput,
        submitBtn,
        ...utils
    };
}
test('renders without crashing', () => {
    let utils = setup();
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
});


test("create event successful", () => {
    let utils = setup();
    const { newEventInput, submitBtn } = utils;
    mockCreateEvent.mockReturnValueOnce({payload: {status: "created"}});
    mockFetchEvents.mockReturnValueOnce({payload: {events: []}});

    const eventName = "new event";
    fireEvent.change(newEventInput, {target: {value: eventName }});
    await act(async () => {   
        await fireEvent.click(submitBtn);
    });

})

// Test create event
// Happy path and not happy path.

// Test fetch events
// Happy path - returns list of events, returns empty list.
// Not happy path when it returns an error.