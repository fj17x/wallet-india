import Web3 from "web3"
export default getWeb3

async function fromBrowser() {
  let web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.enable() //asking the user for permission
      return web3
    } catch (error) {
      alert("User has denied connection: " + error)
    }
  } else if (window.web3) {
    // if old MetaMask extension
    web3 = window.web3
    return web3
  } else {
    //no MetaMask extension; try a local blockchain(like ganache/truffle).

    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    web3 = new Web3(provider)
    return web3
  }
}

async function getWeb3() {
  try {
    const web3 = await fromBrowser()
    return web3
  } catch (error) {
    alert("Error connecting to MetaMask/Local Blockchain.")
  }
}

getWeb3()
