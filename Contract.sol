// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Contract {
    string ipfsHash;
    address public owner;
    mapping(address => string[]) links;

    constructor() public {
        owner = msg.sender;
    }

    function setHash(string memory x) public {
        address from = msg.sender;
        ipfsHash = x;
        links[from].push(x);
    }

    function getHash() public view returns (string[] memory x) {
        address from = msg.sender;
        return links[from];
    }

    function getHashesbyGovernment(address userAddress)
        public
        view
        returns (string[] memory x)
    {
        require(
            msg.sender == owner,
            "This can only be called by the contract owner!"
        );
        return links[userAddress];
    }
}
