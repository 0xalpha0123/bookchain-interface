import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import BookForm from './BookForm.js'
import Carousel from './Carousel'
import _ from 'lodash'
import {bookContract, bookChainContract, accounts} from './ethereum/EthereumClient'
import request from 'superagent'


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
          desc: "Test book!",
          id: "Test1"
        }
      ]
    };
    this.addBook = this.addBook.bind(this);
    this.addBookToBookchain = this.addBookToBookchain.bind(this);
  }

  addBookToBookchain(isbn, bookData) {
    bookChainContract.createBook(isbn, {from: accounts[0]})
    this.addBook(bookData)
  }
  
  addBook(book) {
      console.log(book)        
      this.setState({
        books: this.state.books.concat({
          title: book.title,
          author: book.authors[0],
          id: book.industryIdentifiers[0].identifier,
          desc: book.description,
          // img_url: book.imageLinks.smallThumbnail
        })
      })
  };

  getBookData = (bookIsbn) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn${bookIsbn}`;

    request.get(url).then((res) => {
      let bookData = _.first(res.body.items).volumeInfo
      this.addBookToBookchain(bookIsbn, bookData)
    }).catch((err) => alert(`You hit a problem ${err}`))
  }

  componentWillMount() {
    let data = bookContract;
    // this.getBookData("0316067598"); These can be used as inputs to test
    // this.getBookData("9780060830939");
    
    this.setState({
      isAvailable: String(data.isAvailable()),
      owner: String(data.owner())
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="svg-logo" alt="logo" />
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
          <section>
            this is the book chain address = {bookChainContract.address}
          </section>
          <br/>
          <section>
            ...AND this should be a crazy blockchain address for the contract owner.. { this.state.owner }
          </section>
          <BookForm getBookData={this.getBookData} />
        </div>
      </div>
    );
  }
}
export default App;
