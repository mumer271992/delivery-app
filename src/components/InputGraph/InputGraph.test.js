import React from 'react';
import { shallow } from 'enzyme';

import InputGraph from './InputGraph';

describe('Enter graph input', () => {
  it('renders without crashing', () => {
    const shallowWrapper = shallow(<InputGraph />);
    expect(shallowWrapper.length).toEqual(1);
  });
  it('is form field is rendered', () => {
    const shallowWrapper = shallow(<InputGraph />);
    const inputWrapper = shallowWrapper.find('[data-test="inputgraph-form"] input');
    const buttonWrapper = shallowWrapper.find('[data-test="inputgraph-form"] button');
    expect(inputWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });
  it('should call change handler', () => {
    const spy = jest.spyOn(InputGraph.prototype, 'handleChange');
    const shallowWrapper = shallow(<InputGraph />);
    const inputWrapper = shallowWrapper.find('[data-test="inputgraph-form"] input').at(0);
    const inputGraph = 'AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1';
    inputWrapper.simulate('change', {
      target: {
        value: inputGraph,
        name: 'graphInput'
      },
    });
    expect(shallowWrapper.state().graphInput).toEqual(inputGraph);
    expect(spy).toHaveBeenCalled();
  });
  it('should submit form on clicking submit', () => {
    const spy = jest.spyOn(InputGraph.prototype, 'handleChange');
    const shallowWrapper = shallow(<InputGraph />);
    const buttonWrapper = shallowWrapper.find('[data-test="inputgraph-form"] button').at(0);
    buttonWrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});

