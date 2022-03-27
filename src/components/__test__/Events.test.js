import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

const setup = (numEvents=0) => {
    let utils;
    const store = mockStore({
        token: "token",
    });
    let events = [];
    for (let i = 0; i < numEvents; i++){
        events.push({
            id: i,
            name: "name" + i,
            status: "created"
        });
    }
    mockFetchEvents.mockReturnValueOnce({payload: {events}});
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
        newEventError,
        ...utils
    };
}
test('renders without crashing: empty list', () => {
    let utils = setup();
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
});


test("create event successfully", async () => {
    let utils = setup();
    const { newEventInput, submitBtn, newEventError } = utils;
    mockCreateEvent.mockReturnValueOnce({payload: {status: "created"}});
    mockFetchEvents.mockReturnValueOnce({payload: {events: []}});

    const eventName = "new event";
    fireEvent.change(newEventInput, {target: {value: eventName }});
    await act(async () => {   
        await fireEvent.click(submitBtn);
    });
    expect(newEventError).toHaveTextContent("");

})

test("create event failed", async () => {
    let utils = setup();
    const { newEventInput, submitBtn, newEventError } = utils;
    mockCreateEvent.mockReturnValueOnce({payload: {errors: "error"}});
    mockFetchEvents.mockReturnValueOnce({payload: {events: []}});

    const eventName = "new event";
    fireEvent.change(newEventInput, {target: {value: eventName }});
    await act(async () => {   
        await fireEvent.click(submitBtn);
    });
    expect(newEventError).not.toHaveTextContent("");

})

test("fetch events empty list", async () => {
    let utils = setup();
    const { newEventInput, submitBtn, newEventError } = utils;
    mockCreateEvent.mockReturnValueOnce({payload: {errors: "error"}});
    mockFetchEvents.mockReturnValueOnce({payload: {events: []}});

    const eventName = "new event";
    fireEvent.change(newEventInput, {target: {value: eventName }});
    await act(async () => {   
        await fireEvent.click(submitBtn);
    });
    expect(newEventError).not.toHaveTextContent("");

})

test("fetch events list of items", async () => {
    
    let utils = setup(15);
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})
