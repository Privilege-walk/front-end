import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import QRCodePage from '../Walk/QRCodePage';

const mockedGoNextPage = jest.fn();

test('renders without crashing',  () => {
    let utils;
    act (() => {
        utils = render( <QRCodePage eventId={1} eventName='eventName' goNextPage={mockedGoNextPage} />);
    }); 
    const { asFragment } = utils;
    expect(asFragment()).toMatchSnapshot();
})

test('when host clicks on start', async () => {
    let utils;
    act (() => {
        utils = render( <QRCodePage eventId={1} eventName='eventName' goNextPage={mockedGoNextPage} />);
    });
    const startBtn = screen.getByText("Start", {selector: "button"});
    await act(async () => {   
        await fireEvent.click(startBtn);
    });
    expect(mockedGoNextPage).toHaveBeenCalledTimes(1);
})