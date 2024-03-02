// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract MiddleMan {
    // immutables: no SLOAD
    uint256 public immutable timeLockInit;
    uint256 public immutable timelock;

    // storage varables
    address public owner;
    uint256 public totalSaved;
    uint256 public savingsAmt;

    // errors
    error FundsLocked();
    error InsuffientValue();
    error Unauthorized();

    constructor(address _owner, uint256 _savingsAmt, uint256 _timelock) {
        owner = _owner;
        savingsAmt = _savingsAmt;
        timelock = _timelock;

        // initialize timplock
        timeLockInit = block.timestamp;
    }

    function entryPoint(address _target, bytes memory _calldata)
        public
        payable
        onlyOwner
        returns (bool success, bytes memory returnData)
    {
        // ensure value was senta
        if (msg.value < savingsAmt) {
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
        if (block.timestamp < timeLockInit + timelock) {
            revert FundsLocked();
        }

        payable(owner).transfer(amt);
    }

    function changeSavingsAmt(uint256 _savingsAmt) public onlyOwner {
        savingsAmt = _savingsAmt;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    receive() external payable { }
}
