import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

// import the componant you want to test
import App from '../src/components/App'

// this shallow method allows us to render a component
// it isolates 1 component for testing
// other options for rendering are mount and static
// * mount is 'real' rendering and will render in a browser
// * static allows you to pass expectations on the HTML inside the component

describe ('<App />', () => {

  it('should have svg icon', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('.svg-logo')).to.have.length(1);
  })

  it('should have state for isAvailable, owner, and books', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.state().bookchainContract).to.be.defined;
    expect(wrapper.state().books).to.be.defined;
  })

  it('should have carousel for displaying books', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.slide-show')).to.have.length(1);
  })

  it('should start with add contract form', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ContractForm')).to.have.length(1);
  })

  it('should have Carousel component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Carousel')).to.have.length(1)
  })
})
