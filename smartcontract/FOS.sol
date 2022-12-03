pragma solidity 0.8.7;

contract BillBoard{
    string public URL;
    uint public lastPrice;
    uint public bidPrice;
    uint internal minLimit;
    address payable public owner; 
    address payable public lastBidder; 

    event gotEther(uint funded);
    event refunded(bool refunded);
    bool firstUse;


    constructor(uint _basePrice, string memory url) public{
        lastPrice = _basePrice * 1000000000000000;
        URL = url;
        owner = payable(msg.sender); 
        lastBidder = owner;
    }

    function sendEth(string memory url) public payable{
        require(msg.value >= minLimit, "Pay more than the minimum limit");
        URL = url;
        bidPrice = msg.value;
        emit gotEther(bidPrice);
        if(firstUse){
            firstUse = true;
        }else{
            refund(bidPrice);
        }
    }

}