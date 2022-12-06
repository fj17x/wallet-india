import getWeb3 from "./getWeb3"
// to call the getWeb3() function here.

async function storehash() {
  const address = "0x0cB7AC1624A626D64947aaf5eDa36381065791E3"
  // address and ABI of contract deployed in Ropsten network
  const abi = [
    {
      inputs: [],
      name: "getHash",
      outputs: [
        {
          internalType: "string[]",
          name: "x",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "x",
          type: "string",
        },
      ],
      name: "setHash",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]
  const web3 = await getWeb3()
  //call the function to connect to MetaMask
  return new web3.eth.Contract(abi, address)
}
storehash()

export default storehash
