// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AudioFiToken is ERC20 {
    address public owner;

    constructor() ERC20("AudioFi Token", "AFT") {
        owner = msg.sender;
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint 1 million AFT to deployer
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    modifier onlyOwner() { 
      if (msg.sender != owner) revert("Only Owner can mint");  
       _; 
     }
}
