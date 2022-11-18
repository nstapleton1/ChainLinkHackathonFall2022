# Chainlink Hackathon Fall 2022 Project

## Problem

Bring gamefied education to web3.  English speakers have difficulty identifying masculine and feminine nouns in foreign languages e.g. Spanish.  The dApp will help English speakers to learn foreign vocabulary and learn noun genders at the same time.

## Technologies Used

Chainlink Aggregator for getting ETH/USD price feed

IPFS for storing and retrieving picture content

Brownie framework for Solidity development and testing

Javascript for UI

## Tech Details

ChainLinkHackathonFall2022/blob/main/ipfs/app.js: creates an ipfs client; sends images to IPFS for storage; writes storage location and image metadata to a file

ChainLinkHackathonFall2022/blob/main/contracts/Quiz.sol: solidity contract; accepts player fees; allows withdrawals to owner; stores user scores

ChainLinkHackathonFall2022/blob/main/UX/js/index.js: handles the UI including retrieving images from IPFS via INFURA gateway - 
    let picString = "https://"+picCID+".ipfs.dweb.link"
    mainpic.src = picString

## Future Development

Use nodejs and web3.js to better connect UX to contract

Buffer download of images from IPFS to improve user experience

Create NFTs to reward users and allow access to other levels

Host entire website on IPFS

