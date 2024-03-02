// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IMiddleMan {
    // read functions
    function totalSaved() external view returns (uint256);
    function owner() external view returns (address);

    // write functions
    function entryPoint(address, bytes memory) external payable returns (bool, bytes memory);

    function changeOwner(address) external;

    function withdraw(uint256) external;
}
