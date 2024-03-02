// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract MiddleMan {
    // storage varables
    uint256 public totalSaved;
    address public owner;

    // errors
    error InsuffientValue();
    error Unauthorized();

    constructor(address _owner) {
        owner = _owner;
    }

    function entryPoint(address _taget, bytes memory _calldata)
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
        (success, returnData) = _taget.call(_calldata);
    }

    function changeowner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function withdraw(uint256 amt) public onlyOwner {
        payable(owner).transfer(amt);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert Unauthorized();
        }
        _;
    }

    receive() external payable { }
}
