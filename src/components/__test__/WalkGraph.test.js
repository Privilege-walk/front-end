import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import WalkGraph from '../Graphs/WalkGraph';

let walkStats = {
    "barDefaultColor": "#8884d8",
    "xLabelMin": "Some text to be displayed on the graph",
    "xLabelMax": "Something else you want to be displayed on the graph",
    "data": [
        {
            "barName": "",
            "count": 1,
            "line_count": 2,
            "participantLocation": false
        },
        {
            "barName": "",
            "count": 1,
            "line_count": 2,
            "participantLocation": false
        },
        {
            "barName": "",
            "count": 2,
            "line_count": 2,
            "participantLocation": true
        }
    ]
}

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <WalkGraph data={walkStats} />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})