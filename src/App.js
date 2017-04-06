import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BookForm from './BookForm.js';
import Carousel from './Carousel';
import bookContract from './ethereum/EthereumClient';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAvailable: [],
      owner: [],
      books: [
        {
          title: "Don Quixote",
          author: "Miguel de Cervantes",
          isdn: "1"
        },
         {
          title: "Ulysses",
          author: "James Joyce",
          isdn: "2"
        },
         {
          title: "The Odyssey",
          author: "Homer",
          isdn: "3"
        },
         {
          title: "Not Don Quixote",
          author: "Not Miguel de Cervantes",
          isdn: "4"
        },
         {
          title: "Moby Dick",
          author: "Herman Melville",
          isdn: "5"
        },
      ]
    }
  }
  componentWillMount() {
    let data = bookContract
    this.setState({
      isAvailable: String(data.isAvailable()),
      owner: String(data.owner())
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bookchain</h2>
        </div>
        <div className="App-intro">
          <div className="slide-show">
            <Carousel books={this.state.books} />
          </div>
          <br/>
          <section>
            This should return the availability state of our contract living on
            the local blockchain >> `{ this.state.isAvailable }` this should be true/false
          </section>
          <br/>
          <section>
            ...AND this should be a crazy blockchain address for the contract owner.. { this.state.owner }
          </section>
          <BookForm name='name' />
          <BookForm name='author' />
          <BookForm name='isdn' />
        </div>
      </div>
    );
  }
}

export default App;
