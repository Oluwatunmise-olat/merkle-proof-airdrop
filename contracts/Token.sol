// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AclToken is ERC20("Tear ACL", "Acl") {
    address owner;

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Access denied");
        _mint(to, amount);
    }
}
