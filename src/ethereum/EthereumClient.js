import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const bookContractABI = [
    {
      "constant": false,
      "inputs": [],
      "name": "checkout",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "status",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "kill",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isbn",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "returnBook",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "borrower",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isAvailable",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "arbiter",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_isbn",
          "type": "string"
        },
        {
          "name": "_arbiter",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    }
  ]

const bookChainContractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "getBookshelfCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "kill",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "availableBooks",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_isbn",
          "type": "string"
        }
      ],
      "name": "createBook",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_bookContract",
          "type": "address"
        }
      ],
      "name": "borrowBook",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getBookshelf",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bookshelf",
      "outputs": [
        {
          "name": "isbn",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "bookContract",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "isbn",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "bookAddedToShelf",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "isbn",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "bookMadeAvailable",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "isbn",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "bookMadeUnavailable",
      "type": "event"
    }
  ]

const bookContractAddress = '0x929bbbf2701f2d7b9ceed38153f47b3701372b50'

const bookChainContractAddress = '0x02bba5f902fd61b111b15f7f622b61a70bf2a265'

const bookChainContract = ETHEREUM_CLIENT.eth.contract(bookChainContractABI).at(bookChainContractAddress)

const bookContract = ETHEREUM_CLIENT.eth.contract(bookContractABI).at(bookContractAddress)

module.exports  = { 
  bookContract: bookContract,
  bookChainContract: bookChainContract
}