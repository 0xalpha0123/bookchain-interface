import { WEB3 } from '../ethereum/EthereumClient'


const ParseBooks = (bookList, getBookData) => {
  let bookIsbns = []

  bookList.titles.map((title, i) => {
    return bookIsbns.push([WEB3.toAscii(title), bookList.status[i]])
  })
  bookIsbns.forEach( (bookInfo) => {
    getBookData(bookInfo[0], bookInfo[1])
  })
 
}
export default ParseBooks;