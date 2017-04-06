import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// import the componant you want to test
import App from '../src/App'

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
    expect(wrapper.state().isAvailable).to.be.defined;
    expect(wrapper.state().owner).to.be.defined;
    expect(wrapper.state().books).to.be.defined;
  })

})
