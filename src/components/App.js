import {Bookchain, accounts} from '../ethereum/EthereumClient'
import React, { Component } from 'react'
import logo from '../logo.svg'
import ContractForm from './ContractForm'
import BookForm from './BookForm.js'
import Carousel from './Carousel'
import request from 'superagent'
import _ from 'lodash'
import '../css/App.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookchainContract: "",
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
    let contract = this.state.bookchainContract
    Bookchain.at(contract).createBook(isbn, {from: accounts[0], gas: 1000000})
    this.addBook(bookData)
  }
  
  addBook(book) {
      this.setState({
        books: this.state.books.concat({
          title: book.title,
          author: book.authors[0],
          id: book.industryIdentifiers[0].identifier,
          desc: book.description,
          img_url: book.imageLinks.smallThumbnail
        })

      })
    });
  }

  getBookData = (bookIsbn) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookIsbn}`;
    request.get(url, true).withCredentials().then((res) => {
      let accessibilityData = _.first(res.body.items).accessInfo.textToSpeechPermission
      let bookData = _.first(res.body.items).volumeInfo
      this.addBookToBookchain(bookIsbn, bookData, accessibilityData)
    }).catch((err) => alert(`You hit a problem ${err}`))
  }

  addContract = (contract) => {
    localStorage.setItem('contract', contract)
    this.setState({
      bookchainContract: localStorage.contract,
      ownerWallet: accounts[0]
    })
    this.forceUpdate()
  }
  componentWillMount() {
    this.setState({bookchainContract: localStorage.contract})
  }


  render() {
    let form = null;
    let wallet = null;
    if (this.state.bookchainContract) {
      form = <BookForm getBookData={this.getBookData}/>
      wallet = <div> Wallet ID = {this.state.bookchainContract} </div>
    } else {
      form = <ContractForm addContract={this.addContract} />
    }


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="svg-logo" alt="Missing Logo" />
          <h2>Bookchain</h2>
        </div>
        <div className="body">
          <div className="slide-show">
            <Carousel books={this.state.books} />
            <br/>
            <div>{wallet}</div>
            {form}
          </div>
          <br/>
        </div>
      </div>
    );
  }
}
export default App;
