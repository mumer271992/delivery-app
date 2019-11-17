import React from 'react';
import { shallow } from 'enzyme';

import ShortestPath from './ShortestPath';

describe('Enter graph input', () => {
  it('renders without crashing', () => {
    const shallowWrapper = shallow(<ShortestPath />);
    expect(shallowWrapper.length).toEqual(1);
  });
  it('is form field is rendered', () => {
    const shallowWrapper = shallow(<ShortestPath />);
    const inputWrapper = shallowWrapper.find('[data-test="shortestpath-form"] input');
    const buttonWrapper = shallowWrapper.find('[data-test="shortestpath-form"] button');
    expect(inputWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });
  it('should call change handler', () => {
    const spy = jest.spyOn(ShortestPath.prototype, 'handleChange');
    const shallowWrapper = shallow(<ShortestPath />);
    const inputWrapper = shallowWrapper.find('[data-test="shortestpath-form"] input').at(0);
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
    const spy = jest.spyOn(ShortestPath.prototype, 'handleChange');
    const shallowWrapper = shallow(<ShortestPath />);
    const buttonWrapper = shallowWrapper.find('[data-test="shortestpath-form"] button').at(0);
    buttonWrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});

