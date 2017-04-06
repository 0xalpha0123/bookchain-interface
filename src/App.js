import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BookForm from './BookForm.js';
import Carousel from './Carousel';
import bookContract from './ethereum/EthereumClient';

const bookContractAddress = '0x468a2507dd1d438c42160390d3d7a8d47bec8765';

class App extends Component {
  constructor(props) {
    super(props);
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
          title: "Don Quixote",
          author: "Miguel de Cervantes",
          isdn: "4"
        },
         {
          title: "Moby Dick",
          author: "Herman Melville",
          isdn: "5"
        },
      ]
    };
  }

  componentWillMount() {
    let data = bookContract;
    let bookIsbn = "0316067598";
    const url = "https://www.googleapis.com/books/v1/volumes?q=isbn" +
      bookIsbn;

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        this.setState({
          book: data.items[0]
        });
      }).done();
    this.setState({
      isAvailable: String(data.isAvailable()),
      owner: String(data.owner())
    });
  }
  // componentWillMount() {
  //   fetch("http://date.jsontest.com/")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log('a');
  //       this.setState({date: responseData.date});
  //     })
  //     .done();
  // }

  getBookData() {
    let bookIsbn = "0316067598";
    const url = "https://www.googleapis.com/books/v1/volumes?q=isbn" +
      bookIsbn;

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        this.setState({
          book: data.items[0]
        });
        var bookData = data.items[0];
        debugger;
      });
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
