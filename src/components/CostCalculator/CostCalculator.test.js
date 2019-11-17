import React from 'react';
import { shallow } from 'enzyme';

import CostCalculator from './CostCalculator';

describe('Enter graph input', () => {
  it('renders without crashing', () => {
    const shallowWrapper = shallow(<CostCalculator />);
    expect(shallowWrapper.length).toEqual(1);
  });
  it('is form field is rendered', () => {
    const shallowWrapper = shallow(<CostCalculator />);
    const inputWrapper = shallowWrapper.find('[data-test="costcalculator-form"] input');
    const buttonWrapper = shallowWrapper.find('[data-test="costcalculator-form"] button');
    expect(inputWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });
  it('should call change handler', () => {
    const spy = jest.spyOn(CostCalculator.prototype, 'handleChange');
    const shallowWrapper = shallow(<CostCalculator />);
    const inputWrapper = shallowWrapper.find('[data-test="costcalculator-form"] input').at(0);
    const inputGraph = 'ABE';
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
    const spy = jest.spyOn(CostCalculator.prototype, 'handleChange');
    const shallowWrapper = shallow(<CostCalculator />);
    const buttonWrapper = shallowWrapper.find('[data-test="costcalculator-form"] button').at(0);
    buttonWrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});

