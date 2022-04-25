import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Timer from '../Walk/Timer';

test('renders without crashing',  () => {
    jest.useFakeTimers();
    let utils;
    act (() => {
        utils = render( <Timer questionIndex={0} />);
    }); 
    jest.advanceTimersByTime(100000);
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})