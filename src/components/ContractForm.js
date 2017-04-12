import React, { Component } from 'react';


class ContractForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addContract(this.state.value);
    // this.setState({value: ''})
  }

  render() {
    return (
      <form tabIndex="0" onSubmit={this.handleSubmit}>
        <br/>
        <label tabIndex="0">
          <p>
            Add a Contract address
          </p>
          <input tabIndex="0" className="Contract-form" type="name" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input tabIndex="0" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ContractForm;
