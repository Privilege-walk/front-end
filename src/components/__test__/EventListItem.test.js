import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import EventListItem from '../events/EventListItem';

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    Navigate: () => "Navigate",
    useNavigate: () => mockedUsedNavigate,
}))

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <EventListItem name="" status="created" />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})