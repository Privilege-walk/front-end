import React from "react";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import QuestionsListItem from '../Questions/QuestionsListItem';

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <QuestionsListItem description="" choices={[{
            id: 1,
            description: "desc",
            value: 0
        }]} />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})