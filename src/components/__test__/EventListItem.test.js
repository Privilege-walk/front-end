import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import EventListItem from '../events/EventListItem';

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useNavigate: () => mockedUsedNavigate,
}))

afterEach(jest.clearAllMocks);

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <EventListItem name="" status="created" />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})

test('renders questions page', async () => {
    render( <EventListItem name="" status="created" />);
    const editBtn = screen.getByText("Edit", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(editBtn);
    });
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
})

test('renders host walk page', async () => {
    render( <EventListItem name="" status="created" />);
    const goLiveBtn = screen.getByText("Go Live", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(goLiveBtn);
    });
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
})