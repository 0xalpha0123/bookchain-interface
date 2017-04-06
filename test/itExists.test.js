import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from '../src/App'

const wrapper = shallow(<App/>);

describe('(Component) MyComponent', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1);
  });
});