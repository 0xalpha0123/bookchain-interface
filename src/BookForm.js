import React from 'react';
  class BookForm extends React.Component {
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
      this.props.getBookData(this.state.value)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <br/>
          <label tabIndex="0">
            Add a book by isbn: 
            <input type="name" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default BookForm;