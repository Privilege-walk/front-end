import React from "react";
import { render } from '@testing-library/react';
import Welcome from '../Welcome';

test("Welcome page renders without crashing", async () => {
    const { asFragment } = render(<Welcome />);
    expect(asFragment()).toMatchSnapshot();
})