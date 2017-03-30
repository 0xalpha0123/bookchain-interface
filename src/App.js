import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>BookCHAIN!!!!111!!</h2>
        </div>
        <p className="App-intro">
          You can edit'<code>src/App.js</code>'' and see your changes here..
          Later we will hook into React-Router to make magic and CRUD out some books!
        </p>
      </div>
    );
  }
}

export default App;
