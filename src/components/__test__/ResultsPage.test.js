import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ResultsPage from '../Walk/ResultsPage';

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <ResultsPage />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})