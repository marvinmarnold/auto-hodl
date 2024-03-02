// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IFactory {
    // read functions
    function accountLookup(address) external view returns (address);

    // write functions
    function createAccount(uint256 _savingsAmt, uint256 _timelock) external payable returns (address);
}
