// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Box.sol";

contract BoxV2 is Box {
    // Increments the stored value by 1
    function increment() public {
        store(retrieve()+1);
    }
}