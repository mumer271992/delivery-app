import React from 'react';
import { shallow } from 'enzyme';

import PossibleRoutes from './PossibleRoutes';

describe('Enter graph input', () => {
  it('renders without crashing', () => {
    const shallowWrapper = shallow(<PossibleRoutes />);
    expect(shallowWrapper.length).toEqual(1);
  });
  it('is form field is rendered', () => {
    const shallowWrapper = shallow(<PossibleRoutes />);
    const inputWrapper = shallowWrapper.find('[data-test="possibleroutes-form"] input');
    const buttonWrapper = shallowWrapper.find('[data-test="possibleroutes-form"] button');
    expect(inputWrapper.length).toEqual(3);
    expect(buttonWrapper.length).toEqual(1);
  });
  it('should call change handler', () => {
    const spy = jest.spyOn(PossibleRoutes.prototype, 'handleChange');
    const shallowWrapper = shallow(<PossibleRoutes />);
    const inputWrapper = shallowWrapper.find('[data-test="possibleroutes-form"] input').at(0);
    const inputGraph = 'ED';
    inputWrapper.simulate('change', {
      target: {
        value: inputGraph,
        name: 'routeInput'
      },
    });
    expect(shallowWrapper.state().routeInput).toEqual(inputGraph);
    expect(spy).toHaveBeenCalled();
  });
  it('should submit form on clicking submit', () => {
    const spy = jest.spyOn(PossibleRoutes.prototype, 'handleChange');
    const shallowWrapper = shallow(<PossibleRoutes />);
    const buttonWrapper = shallowWrapper.find('[data-test="possibleroutes-form"] button').at(0);
    buttonWrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});

