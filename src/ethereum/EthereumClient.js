import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const bookChainContractABI = [
  {
      "constant": false,
      "inputs": [
        {
          "name": "_isbn",
          "type": "bytes32"
        }
      ],
      "name": "returnBook",
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
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "checkBook",
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
      "name": "kill",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_isbn",
          "type": "bytes32"
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
      "constant": true,
      "inputs": [],
      "name": "getBookshelf",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "address[]"
        },
        {
          "name": "",
          "type": "bool[]"
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
      "constant": false,
      "inputs": [
        {
          "name": "_isbn",
          "type": "bytes32"
        }
      ],
      "name": "checkoutBook",
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
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "checkoutLedger",
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
          "type": "bytes32"
        },
        {
          "name": "bookContractAddress",
          "type": "address"
        },
        {
          "name": "status",
          "type": "bool"
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
          "type": "bytes32"
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
          "type": "bytes32"
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
          "type": "bytes32"
        }
      ],
      "name": "bookMadeUnavailable",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "refreshBookshelf",
      "type": "event"
    }
]

// const bookChainContract = ETHEREUM_CLIENT.eth.contract(bookChainContractABI).at(bookChainContractAddress)
const Bookchain = ETHEREUM_CLIENT.eth.contract(bookChainContractABI)
const accounts = ETHEREUM_CLIENT.eth.accounts

module.exports  = { 
  Bookchain: Bookchain,
  accounts: accounts
}