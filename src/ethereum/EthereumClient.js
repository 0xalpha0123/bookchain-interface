import Web3 from 'web3';

const WEB3 = new Web3()

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const bookcoinContractABI = []

const bookChainContractABI = []

// const bookChainContract = ETHEREUM_CLIENT.eth.contract(bookChainContractABI).at(bookChainContractAddress)
const Bookchain = ETHEREUM_CLIENT.eth.contract(bookChainContractABI)
const accounts = ETHEREUM_CLIENT.eth.accounts

module.exports  = { 
  Bookchain: Bookchain,
  accounts: accounts,
  WEB3: WEB3
}