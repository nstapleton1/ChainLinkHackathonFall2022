// import { Contract, providers, utils } from "ethers";
// import Head from "next/head";
// import React, { useEffect, useRef, useState } from "react";
// import Web3Modal from "web3modal";
import { abi, QUIZ_CONTRACT_ADDRESS, contractAddress } from "./constants/index.js";
// import {getData} from "../../ipfs/app.js";
// import styles from "./css/style1.css;
import { ethers } from "./ethers-5.6.esm.min.js";
// import { Web3 } from "./web3.min.js"

const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const nextButton = document.getElementById("nextButton")
const connectButton = document.getElementById("connectButton")
const balanceLabel = document.getElementById("balanceLabel")
const mainpic = document.getElementById("mainpic")
const elButton = document.getElementById("elButton")
const laButton = document.getElementById("laButton")
const questionLabel = document.getElementById("questionLabel")
const scoreLabel = document.getElementById("scoreLabel")

connectButton.onclick = connect
// withdrawButton.onclick = withdraw
fundButton.onclick = fund
// balanceButton.onclick = getBalance
// nextButton.onclick = showNextPic
elButton.onclick = leAnswer
laButton.onclick = laAnswer
nextButton.onclick = nextQuestion

const TransactionTypes = {
    FundPlay: 0,
    Tran1: 1,
    Tran2: 2,
    Tran3: 3
}

const questions = [
    "bafybeihhgdrdk3obf45wpud4gyfar3xm2jk66qugvzetjxcdxsuiu7dt6y,banana,platano,m",
    "bafybeie53yp563qpm2mcqlujrqos4vgmixkqxbiiszjw7y63ebnv24j4lq,clementine,clementina,f",
    "bafybeigv6halae6ef4a6rcgynr6djtebohv5cwfqbgd5b2asfww4ra7uui,grape,uva,f",
    "bafybeieqwqyfgryphxbp3q57j3fscatdforglkyyhejhxblvprbnsoonpu,lemon,limon,m",
    "bafybeibadqopoua4xzcpawstatlqwjhvmzlverarmc5vccolqm6c3ok5tm,melon,melon,m",
    "bafybeihljk7ramwafpcn7clsv4k4cc6ufup5k2kcxpqj26cftghkdv3ibi,peach,melocoton,m",
    "bafybeiempliha6qvsrrblgkefxrzbya6675yu7fti6nydxlrp2uzly5x3a,pineapple,pina,f",
    "bafybeicy56csgxpddtjjtqlcqrjxi6lk2epiyxclqomdphk5vldhvfy674,raisin,uva pasa,f",
    "bafybeiac3qq432h2kp5f7oxrzyctp7tfwfambvd52kbrfhwbtego75vbvm,strawberry,fresa,f"
];
let questionCounter=0;
let score=0;
let answer='m';

async function showNextPic(picCID) {
    // console.log("next button pressed")
    // mainpic.src = "./sio_small.png";
    //showIPFSImage();
    let picString = "https://"+picCID+".ipfs.dweb.link"
    mainpic.src = picString
    // showNextQuestion()
}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

// async function withdraw() {
//     console.log(`Withdrawing...`)
//     if (typeof window.ethereum !== "undefined") {
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         await provider.send('eth_requestAccounts', [])
//         const signer = provider.getSigner()
//         const contract = new ethers.Contract(contractAddress, abi, signer)
//         try {
//             const transactionResponse = await contract.withdraw()
//             await listenForTransactionMine(transactionResponse, provider)
//             // await transactionResponse.wait(1)
//         } catch (error) {
//             console.log(error)
//         }
//     } else {
//         withdrawButton.innerHTML = "Please install MetaMask"
//     }
// }

async function fund() {
    const ethAmount = ".0001";
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.payToPlay({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
            showNextQuestion()
        } catch (error) {
            console.log(error)
        }
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function showNextQuestion() {
    mainpic.src = "./images/black.png"
    const questionMetaData=questions[questionCounter].split(',')
    const questionString = "What is the gender of the Spanish word for " + questionMetaData[1] + ", " + questionMetaData[2] + "?"
    questionLabel.innerHTML = questionString
}

async function nextQuestion() {
    showNextQuestion()
}

async function leAnswer() {
    answer='m';
    handleAnswer()
}

async function laAnswer() {
    answer='f';
    handleAnswer()
}

async function handleAnswer() {
    
    const questionMetaData=questions[questionCounter].split(',')
    showNextPic(questionMetaData[0])
    let answerString = "The gender of the Spanish word for " + questionMetaData[1] + ", " + questionMetaData[2]
    let gender = 'feminine'
    console.log(questionMetaData[3])
    if (questionMetaData[3] == 'm') {
        gender = 'masculine'
    }
    
    answerString += " is " + gender + "."
    questionLabel.innerHTML = answerString
    if (answer = questionMetaData[3]) {
        score +=1
    }
    questionCounter+=1
    let scoreString = score + "/" + questionCounter
    scoreLabel.innerHTML = scoreString
    // showNextPic(questionMetaData[0])
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.utils.formatEther(balance))
            balanceLabel.innerHTML = ethers.utils.formatEther(balance)
        } catch (error) {
            console.log(error)
        }
    } else {
        balanceButton.innerHTML = "Please install MetaMask"
    }
}

async function getQuestionArray() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            // const bal = await contract.methods.doSomething().call({from:accounts[0]});
            // let x=10;
            // x = await contract.doSomething().toString();
            // const bal = 10;
            const x = contract.doSomething().then(val =>{ console.log("Value")})
            console.log(x);
        } catch (error) {
            console.log(error)
        }
    } else {
        balanceButton.innerHTML = "Please install MetaMask"
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}