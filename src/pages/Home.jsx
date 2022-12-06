import React, { useState } from "react"
import getWeb3 from "./ipfs/getWeb3"
import storeHash from "./ipfs/storehash"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Home = () => {
  const [gotData, setGotData] = useState(false)
  const [hashList, setHashList] = useState([])

  /** Converting to a buffer so we can store in IPFS */

  const getUserSentHashes = async () => {
    const web3 = await getWeb3()

    const accounts = await web3.eth.getAccounts() //choosing account to use

    const storeHashContract = await storeHash()
    console.log("YYY")
    const receipt = await storeHashContract.methods
      .getHash()
      .call({ from: accounts[0] })

    console.log("XXX", receipt)

    setHashList(receipt)
    setGotData(true)
  }

  return (
    <div className="App-section">
      <h1 className="h1">
        Wallet India <small style={{ fontSize: "1rem" }}>beta</small>
      </h1>
      <span>
        <p>Your all in one document.</p>
        <p>Note: Please connect MetaMask wallet to the Ropsten Testnet.</p>
      </span>
      <h3> Choose your files and send it to IPFS. </h3>
      <Button variant="outline-primary" size="lg">
        <Link className="linkSend" to="send">
          Send Files
        </Link>
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <Button variant="outline-primary" size="lg" onClick={getUserSentHashes}>
        Show my IPFS files
      </Button>
      <br></br>
      <br />
      {gotData ? (
        <ol
          style={{
            fontSize: "1rem",
            listStylePosition: "inside",
            textAlign: "left",
          }}
        >
          {hashList.map((hash, i) => (
            <li key={i}>
              <a
                href={`https://infura-ipfs.io/ipfs/${hash}`}
              >{`Item Hash: ${hash}`}</a>
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
