import { WEB3 } from '../ethereum/EthereumClient'


const ParseBooks = (bookList, getBookData) => {
  // bookList= {isbns:[isbns], addresses:[bookAddress], status:[status]}
  // normalize data from isbns
  let bookIsbns = []
  bookList.titles.map((title) => {
    return bookIsbns.push(WEB3.toAscii(title))
  })
  
  bookIsbns.forEach( (title) => {
    getBookData(title)
  })
 
}
export default ParseBooks;