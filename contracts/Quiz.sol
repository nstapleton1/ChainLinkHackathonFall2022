// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;
// pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract Quiz {
    address owner;
    uint256 balance;
    mapping(address => uint256) public walletToHighScore;
    AggregatorV3Interface public priceFeed;

    
    constructor(address _priceFeed) public {
        priceFeed=AggregatorV3Interface(_priceFeed);
        owner = msg.sender;
    }

    function getBalance() public view returns(uint256){   
        return balance;
    }


    function getGamePrice() public view returns (uint256) {
        
        uint256 minimumUSD = .1 * 10**18; //it costs 10c to play one quiz
        uint256 price = getPrice();
        uint256 precision = 1 * 10**18;

        return ((minimumUSD * precision) / price) + 1;
    }

    function getPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);
    }

    function getConversionRate(uint256 ethAmount)
        public
        view
        returns (uint256)
    {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000; //10**18
        return ethAmountInUsd;
    }

    function payToPlay() public payable  {
        balance += msg.value;
    }

    function setHighScore(uint256 _score) public {
        if (walletToHighScore[msg.sender] < _score) 
            walletToHighScore[msg.sender] = _score;
    }

    function getHighScore() public returns(uint256) {
        return walletToHighScore[msg.sender];
    }

    function getQuestionArray() public view returns(string[] memory) {
        return questions;
    }

    modifier onlyOwner() {
        //is the message sender owner of the contract?
        require(msg.sender == owner, "Only Owner");

        _;
    }

    // onlyOwner modifer will first check the condition inside it
    // and
    // if true, withdraw function will be executed
    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        balance=0;
    }

    function partialWithdraw() public payable onlyOwner {
        payable(msg.sender).transfer(msg.value);
    }



}//end contract