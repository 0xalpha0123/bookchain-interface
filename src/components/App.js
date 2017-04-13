import {bookchainAddress, bookChainContract, bookcoinContract, accounts} from '../ethereum/EthereumClient'
import React, { Component } from 'react'
import logo from '../logo.svg'
import ContractForm from './ContractForm'
import Bank from './Bank.js'
import BookForm from './BookForm.js'
import Carousel from './Carousel'
import request from 'superagent'
import _ from 'lodash'
import '../css/App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookcoinContract: bookChainContract.bookcoinContract(),
      userWallet: accounts[0],
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
    bookChainContract.createBook(isbn, {from: this.state.userWallet, gas: 1000000})
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
  };

  getBookData = (bookIsbn) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn${bookIsbn}`;

    request.get(url).then((res) => {
      let bookData = _.first(res.body.items).volumeInfo
      this.addBookToBookchain(bookIsbn, bookData)
    }).catch((err) => alert(`You hit a problem ${err}`))
  }

  addContract = (contract) => {
    localStorage.setItem('contract', contract);
    this.setState({
      bookchainContract: localStorage.contract
    })
  }

  getMoney() {
    let money = bookcoinContract.totalSupply({from: this.state.userWallet}).toString(10)
    let vault = bookcoinContract.balanceOf(bookchainAddress, {from: bookchainAddress}).toString(10)
    let userAccount = bookcoinContract.balanceOf(this.state.userWallet, {from: this.state.userWallet}).toString(10)
    this.setState({
      money: money,
      vault: vault,
      userAccount: userAccount
    })
  }

  checkoutBook(id) {
    bookChainContract.checkoutBook(id, {from: this.state.userWallet, gas: 1000000})
    this.forceUpdate()
  }

  returnBook(id) {
    bookChainContract.returnBook(id, {from: this.state.userWallet, gas: 1000000})
    this.forceUpdate()
  }

  componentWillMount() {
    this.getMoney()
  //   this.setState({bookchainContract: localStorage.contract})
  }

  render() {
    let form = null
    let wallet = null
    if (this.state.bookchainContract) {
      form = <BookForm getBookData={this.getBookData}/>
      wallet = <div> Wallet ID = {this.state.bookchainContract} </div>
    } else {
      form = <ContractForm addContract={this.addContract} />
    }


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="svg-logo" alt="logo" />
          <h2>Bookchain</h2>
        </div>
        <div className="body">
          <div className="slide-show">
            <Carousel return={this.returnBook} checkout={this.checkoutBook} books={this.state.books} />
            <br/>
            <div>{wallet}</div>
            {form}
          </div>
          <br/>
          <div className="bank">
            <Bank money={this.state.money} vault={this.state.vault} userAccount={this.state.userAccount}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
