import {Bookchain, Bookcoin, accounts} from '../ethereum/EthereumClient'
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
      bookcoinContract: "",
      bookchainContract: "",
      userWallet: "",
      books: [{
        title: "Bookchain project: A decentralized library",
        status: null,
        id: "test",
        img_url: "https://bookchainproject.com/_media/images/logo.png",
        author: "Nick, Robbie, & Jesse"
    }]
      
    };
    this.addBook = this.addBook.bind(this);
    this.addBookToBookchain = this.addBookToBookchain.bind(this);
    this.addContract = this.addContract.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.updateBank = this.updateBank.bind(this);
    this.changeBookStatus = this.changeBookStatus.bind(this);
  }


  addBookToBookchain(title, bookData, bookStatus) {
    Bookchain.at(localStorage.localBookchain).createBook(title, {from: accounts[0], gas: 1000000})
    this.addBook(title, bookData, bookStatus)
  }
  
  addBook(title, book, bookStatus) {
      this.setState({
        books: this.state.books.concat({
          title: book.title,
          author: book.authors[0],
          id: book.industryIdentifiers[0].identifier,
          desc: book.description,
          img_url: book.imageLinks.smallThumbnail,
          status: bookStatus
        })
      })
  }
  
  getBookData = (bookTitle, bookStatus) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`;
    request.get(url, true).withCredentials().then((res) => {
      let bookData = _.first(res.body.items).volumeInfo
      this.addBookToBookchain(bookData.title, bookData, bookStatus)
    }).catch((err) => alert(`Not a good ISBN or You may have hit a problem ${err}`))
  }
  
  getBooks() {
    let bookList = Bookchain.at(localStorage.localBookchain).getBookshelf() 
    this.setState({
      bookchainBooks: {
        titles: bookList[0],
        addresses: bookList[1],
        status: bookList[2]
      }
    })
  }

  addContract = (chainAddress) => {
    localStorage.setItem('localBookchain', chainAddress)
    localStorage.setItem('localBookcoin', Bookchain.at(localStorage.localBookchain).bookcoinContract())
    Bookchain.at(localStorage.localBookchain).registerUser({from: accounts[0]})
    let money = Bookcoin.at(localStorage.localBookcoin).totalSupply({from: accounts[0]}).toString(10)
    let vault = Bookcoin.at(localStorage.localBookcoin).balanceOf(localStorage.localBookchain, {from: accounts[0]}).toString(10)
    let userAccount = Bookcoin.at(localStorage.localBookcoin).balanceOf(accounts[0], {from: accounts[0]}).toString(10)
    this.setState({
      bookchainContract: localStorage.localBookchain,
      bookcoinContract: localStorage.localBookcoin,
      userWallet: accounts[0],
      money: money,
      vault: vault,
      userAccount: userAccount
    })
    this.forceUpdate()
  }

  updateBank() {
    let money = Bookcoin.at(localStorage.localBookcoin).totalSupply({from: accounts[0]}).toString(10)
    let vault = Bookcoin.at(localStorage.localBookcoin).balanceOf(localStorage.localBookchain, {from: accounts[0]}).toString(10)
    let userAccount = Bookcoin.at(localStorage.localBookcoin).balanceOf(accounts[0], {from: accounts[0]}).toString(10)
    this.setState({
      bookchainContract: localStorage.localBookchain,
      bookcoinContract: localStorage.localBookcoin,
      userWallet: accounts[0],
      money: Bookcoin.at(localStorage.localBookcoin).totalSupply({from: accounts[0]}).toString(10),
      vault: vault,
      userAccount: userAccount
    })
    this.forceUpdate()
  }
  componentWillMount() {
    this.getBooks()
  }
  
  componentDidMount() {
    this.updateBank()
    ParseBooks(this.state.bookchainBooks, this.getBookData)    
  }

  checkoutBook(title) {
    Bookchain.at(localStorage.localBookchain).checkoutBook(title, {from: accounts[0], gas: 1000000})
  }

  returnBook(title) {
    Bookchain.at(localStorage.localBookchain).returnBook(title, {from: accounts[0], gas: 1000000})
    // this.updateBank()
  }

  changeBookStatus(updatedBook) {
    let bookArray = this.state.books
    bookArray.forEach((book) => {
      if ( book.title === updatedBook.title ) {
        if ( updatedBook.status === true ) {
          book.status = false
        } else { book.status = true }
      }
    })
    this.updateBank()
    this.forceUpdate()
  }

  render() {
    let form = null;
    let wallet = null;
    let coinForm = null;
    if (this.state.bookchainContract) {
      form = <BookForm getBookData={this.getBookData}/>
      wallet = <div> 
                  Wallet ID = {this.state.userWallet} <br/>
                  Bookchain Address = {this.state.bookchainContract} <br/>
                  Bookcoin Address = {this.state.bookcoinContract} <br/>
               </div>
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
            <Carousel changeBookStatus={this.changeBookStatus} return={this.returnBook} checkout={this.checkoutBook} books={this.state.books} />
            <br/>
            <div className="container">
              <div className="col wallet">{wallet}</div>
              <div className="col">{form}</div>
              <div className="col">
                <Bank money={this.state.money} vault={this.state.vault} userAccount={this.state.userAccount}/>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </div>
    );
  }
}
export default App;
