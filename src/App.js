import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import BookForm from './BookForm.js';
import Carousel from './Carousel';
import bookContract from './ethereum/EthereumClient';
const request = require('superagent');
const bookContractAddress = '0x468a2507dd1d438c42160390d3d7a8d47bec8765';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: [],
      owner: [],
      testBook: [],
      books: [{
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

    this.setState({
      isAvailable: String(data.isAvailable()),
      owner: String(data.owner())
    });
  }

  componentDidMount() {
    var x = this.getBookData();
    debugger;
  }

  getBookData() {
    let bookIsbn = "0316067598";
    const url = "https://www.googleapis.com/books/v1/volumes?q=isbn" +
      bookIsbn;
    var currentThis = this;

    request
      .get(url)
      .end((err, res) => {
        var bookData = res.body.items[0].volumeInfo;
        // return currentThis.setState({
          // testBook: bookData
        // });
        return bookData;
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
            { this.state.testBook }
          <p>{this.state.testBook.title}</p>
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
