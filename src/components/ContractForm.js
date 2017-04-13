import React, { Component } from 'react';


class ContractForm extends Component {
  constructor(props) {
    super(props);
    this.state = {coinAddress: "",
                  chainAddress: ""};

    this.handleChain = this.handleChain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChain(event) {
    this.setState({chainAddress: event.target.value});
  }

  handleCoin(event) {
    this.setState({coinAddress: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addContract(this.state.chainAddress)
  }

  render() {
    return (
      <form tabIndex="0" onSubmit={this.handleSubmit}>
        <br/>
        <label tabIndex="0">
          <p>
            Add a Contract address
          </p>
          <input tabIndex="0" className="Contract-form" type="name" value={this.state.chainAddress} onChange={this.handleChain} />
          {/*<input tabIndex="0" className="Contract-form" type="name" value={this.state.coinAddress} onChange={this.handleCoin} />*/}
        </label>
        <input tabIndex="0" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ContractForm;
