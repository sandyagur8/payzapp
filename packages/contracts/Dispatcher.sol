// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC20{
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);

}

contract Dispatcher {

address immutable public USDC_ADDRESS;
address immutable public OWNER;

constructor(address _USDC_ADDRESS,address _OWNER){

USDC_ADDRESS = _USDC_ADDRESS;
OWNER = _OWNER;
}

modifier isOwner(){
    require(msg.sender==OWNER,"Only Owner");
    _;
}
function send(address from,address to,uint256 amount) external isOwner {
    IERC20(USDC_ADDRESS).transferFrom(from, to, amount);
}

}