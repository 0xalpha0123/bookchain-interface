import React, { Component } from 'react';

class Bank extends Component {
  // constructor(props) {
  //   // super(props);
  //   // this.state = {value: ''};

  //   // this.handleChange = this.handleChange.bind(this);
  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.getBookData(this.state.value)
  //   this.setState({value: ''})

  // }

  render() {
    return (
      <div> 
        <p> Total Money Supply: {this.props.money} </p>
        <p> User Wallet: {this.props.userAccount} </p>
      </div>
    );
  }
}
export default Bank;