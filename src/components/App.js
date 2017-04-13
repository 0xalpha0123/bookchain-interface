import {bookchainAddress, bookChainContract, bookcoinContract, accounts} from '../ethereum/EthereumClient'
import React, { Component } from 'react'
import logo from '../logo.svg'
import ContractForm from './ContractForm'
import Bank from './Bank.js'
import ParseBooks from './ParseBooks'
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
      bookchainContract: "",
      books: [
        {
          title: "Don Quixote",
          author: "Miguel de Cervantes",
          desc: "Test book!",
          id: "9780679602866",
          status: true
        }
      ]
    };
    this.addBook = this.addBook.bind(this);
    this.addBookToBookchain = this.addBookToBookchain.bind(this);
  }


  addBookToBookchain(title, bookData) {
    let contract = this.state.bookchainContract
    Bookchain.at(contract).createBook(title, {from: accounts[0], gas: 1000000})
    this.addBook(title, bookData)
  }
  
  addBook(title, book) {
      this.setState({
        books: this.state.books.concat({
          title: book.title,
          author: book.authors[0],
          id: book.industryIdentifiers[0].identifier,
          desc: book.description,
          img_url: book.imageLinks.smallThumbnail,
          status: true
        })
      })
  }
  
  getBookData = (bookTitle) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;
    request.get(url, true).withCredentials().then((res) => {
      let bookData = _.first(res.body.items).volumeInfo
      this.addBookToBookchain(bookData.title, bookData)
    }).catch((err) => alert(`Not a good ISBN or You may have hit a problem ${err}`))
  }
  
  getBooks() {
    let bookList = Bookchain.at(localStorage.contract).getBookshelf()    
    this.setState({
      bookchainBooks: {
        titles: bookList[0],
        addresses: bookList[1],
        status: bookList[2]
      }
    })
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
    this.setState({
      bookchainContract: localStorage.contract,
    })
    this.getBooks()
  }
  
  componentDidMount() {
    ParseBooks(this.state.bookchainBooks, this.getBookData)
  }
  
  checkoutBook(id) {
    Bookchain.at(this.state.bookchainContract).checkoutBook(id)
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
    let form = null;
    let wallet = null;
    if (this.state.bookchainContract) {
      form = <BookForm getBookData={this.getBookData}/>
      wallet = <div> Wallet ID = <br/>{this.state.bookchainContract} </div>
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
            <Carousel return={this.returnBook} checkout={this.checkoutBook} books={this.state.books} />
            <br/>
            <div className="container">
              <div className="col wallet">{wallet}</div>
              <div className="col">{form}</div>
            </div>
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
