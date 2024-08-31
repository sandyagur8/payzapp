// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract USDC is ERC20, ERC20Permit {
    constructor() ERC20("USDC", "USDC") ERC20Permit("USDC") {
        _mint(msg.sender, 10000000000 * 10 ** decimals());
    }
}

