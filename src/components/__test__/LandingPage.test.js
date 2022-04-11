import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import LandingPage from '../Walk/LandingPage';

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <LandingPage eventName="eventName" />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})