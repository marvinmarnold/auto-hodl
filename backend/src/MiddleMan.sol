// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract MiddleMan {
    // storage varables
    uint256 public totalSaved;
    address public owner;
    uint256 public timeLockInit;

    // errors
    error InsuffientValue();
    error Unauthorized();

    constructor(address _owner) {
        owner = _owner;

         // Initialize lockTime, for example, at contract deployment
        timeLockInit = block.timestamp;
    }

    function entryPoint(address _target, bytes memory _calldata)
        public
        payable
        onlyOwner
        returns (bool success, bytes memory returnData)
    {
        // ensure value was senta
        if (msg.value < 0.0001 ether) {
            revert InsuffientValue();
        }

        // increment total saved
        totalSaved += msg.value;

        // forward call to destination contract
        (success, returnData) = _target.call(_calldata);
    }

    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function withdraw(uint256 amt) public onlyOwner {
        require(block.timestamp >= timeLockInit + 365 days, "Funds are locked");
        payable(owner).transfer(amt);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    receive() external payable { }
}
