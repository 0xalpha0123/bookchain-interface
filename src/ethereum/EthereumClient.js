import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const bookContractABI = [
  {
    "constant":false,
    "inputs":[],"name":"checkout",
    "outputs":[{"name":"",
    "type":"uint8"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[],
    "name":"name",
    "outputs":[{"name":"","type":"bytes32"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[],
    "name":"status",
    "outputs":[{"name":"","type":"uint8"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":false,
    "inputs":[],
    "name":"returnBook",
    "outputs":[{"name":"","type":"uint8"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,"inputs":[],
    "name":"borrower",
    "outputs":[{"name":"","type":"address"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[],
    "name":"isAvailable",
    "outputs":[{"name":"","type":"bool"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[],
    "name":"owner",
    "outputs":[{"name":"","type":"address"}],
    "payable":false,
    "type":"function"
  },
  {
    "constant":true,
    "inputs":[],
    "name":"author",
    "outputs":[{"name":"","type":"bytes32"}],
    "payable":false,
    "type":"function"
  },
  {
    "inputs":[
      {"name":"_name","type":"bytes32"},
      {"name":"_author","type":"bytes32"}
    ],
    "payable":false,"type":"constructor"}]

const bookContractAddress = '0x468a2507dd1d438c42160390d3d7a8d47bec8765'

const bookContract = ETHEREUM_CLIENT.eth.contract(bookContractABI).at(bookContractAddress)

export default bookContract;