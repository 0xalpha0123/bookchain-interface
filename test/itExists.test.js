import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from '../src/components/App'

const wrapper = shallow(<App/>);

describe('(Component) App', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1);
  });
});