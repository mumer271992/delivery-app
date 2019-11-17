import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  const shallowWrapper = shallow(<App />);
  expect(shallowWrapper.length).toEqual(1);
});
