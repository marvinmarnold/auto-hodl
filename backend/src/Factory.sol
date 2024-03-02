// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// Local
import { MiddleMan } from "./MiddleMan.sol";

/// @title Auto-Hodl Factory
/// @notice Creates auto-hodl contracts and stores their addresses
contract Factory {
    // storage variables
    /// @dev accountLookup[owner] = account
    mapping(address => address) public accountLookup;

    // Errors
    error AccountExists();

    // Events
    event AccountCreated(address indexed owner, address indexed account);

    constructor() { }

    /**
     * @notice Deploys an account if one does not exist for a user.
     */
    function createAccount(uint256 _savingsAmt, uint256 _timelock) public payable returns (address account) {
        if (accountLookup[msg.sender] != address(0)) revert AccountExists();

        account = address(new MiddleMan(msg.sender, _savingsAmt, _timelock));

        accountLookup[msg.sender] = account;

        emit AccountCreated(msg.sender, account);
    }
}
