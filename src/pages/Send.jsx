import React, { useState } from "react"
import getWeb3 from "./ipfs/getWeb3"
import ipfs from "./ipfs/ipfs"
import storeHash from "./ipfs/storehash"
import { HashLoader } from "react-spinners"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Home = () => {
  var file = ""
  const [ipfsHash, setIpfsHash] = useState(null)
  const [buffer, setBuffer] = useState("")
  const [ethAddress, setEthAddress] = useState("")
  const [storeHashTransaction, setStoreHashTransaction] = useState("")
  const [blockNumber, setBlockNumber] = useState("")
  const [messageStatus, setMessageStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gotData, setGotData] = useState(false)
  const [hashList, setHashList] = useState([])

  const captureFile = (event) => {
    //to upload files
    event.stopPropagation()
    event.preventDefault()
    file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)
  }

  /** Converting to a buffer so we can store in IPFS */
  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result)
    setBuffer(buffer)
  }

  const sendToIPFS = async (event) => {
    setLoading(true)
    event.preventDefault()

    const ipfsHash = await ipfs.add(buffer) // Stores buffer in IPFS and returns the IPFS Hash
    setIpfsHash(ipfsHash.path)

    try {
      const web3 = await getWeb3()

      const accounts = await web3.eth.getAccounts() //choosing account to use

      const storeHashContract = await storeHash() // get the contract we want to interact with

      const ethAddress = await storeHashContract.options.address
      setEthAddress(ethAddress) // set EthAddress to the contract's address.

      //call the setHash method of the contract.
      const receipt = await storeHashContract.methods
        .setHash(ipfsHash.path)
        .send({ from: accounts[0] })
      setStoreHashTransaction(receipt)
      setLoading(false)
      setMessageStatus(true)
    } catch (error) {
      alert(`Error in getting contract.`)
      console.error(error)
      setLoading(false)
    }
  }

  const getDetails = async () => {
    setBlockNumber(storeHashTransaction.blockNumber) // to get blockNumber where IPFS hash stored.
  }
  return (
    <div className="App-section">
      <h1 className="h1">Sending Page</h1>
      <span>
        <p>Your all in one document.</p>
      </span>
      <h3> Click the button below to send a file. </h3>
      <form onSubmit={sendToIPFS}>
        <Input type="file" onChange={captureFile} />
        <br></br>
        <br></br>

        {loading ? (
          <div className="spinner">
            <HashLoader color={"#6CEC7D"} loading={loading} />
          </div>
        ) : (
          <Button variant="outline-primary" size="lg" type="submit">
            {" "}
            Send file to IPFS
          </Button>
        )}
      </form>
      <br></br> <br></br>
      <Button variant="outline-primary" size="lg" onClick={getDetails}>
        Get Block Id
      </Button>
      <br></br>
      <br></br>
      {messageStatus ? (
        <div style={{ color: "green" }}>The transaction was completed!</div>
      ) : (
        <div></div>
      )}
      <div style={{ fontSize: "1.5rem" }}>
        The block ID of the transaction is:{" "}
        {blockNumber ? blockNumber : "empty"}
      </div>
      <br></br>
      <Button variant="outline-primary" size="lg">
        <Link className="linkSend" to="/">
          Go back
        </Link>
      </Button>
      <br />
      {gotData ? (
        <ol>
          {hashList.map((hash, i) => (
            <li key={i}>
              <a
                href={`https://ipfs.infura.io/ipfs/${hash}`}
              >{`https://ipfs.infura.io/ipfs/${hash}`}</a>
            </li>
          ))}
        </ol>
      ) : (
        <div></div>
      )}
      <br />
      <br />
    </div>
  )
}

export default Home

const Input = styled.input`
  text-align: center;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  content: "Select a file to upload";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;

  &:hover::before {
    border-color: black;
  }
  &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #5468ff 100%
  );
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
  }
`
