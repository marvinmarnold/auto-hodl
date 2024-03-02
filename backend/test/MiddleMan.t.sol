// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import { Test, console2 } from "forge-std/Test.sol";
import { MiddleMan } from "../src/MiddleMan.sol";
import { Counter } from "../src/Counter.sol";

contract MiddleManTest is Test {
    MiddleMan public middleman;
    Counter public counter;
    address public owner;

    function setUp() public {
        owner = address(this);

        // deploy contracts
        counter = new Counter();
        middleman = new MiddleMan(owner, 0.0001 ether, 365 days);
    }

    /// @dev tests entry point on middle man
    //  - the middle man contract's ether balanace should increase by the amount sent
    //  - the totalSaved variable should increase by the amount sent
    function testFuzz_EntryPoint(uint256 amount) public {
        // assumptions
        amount = bound(amount, 0.0001 ether, 1 ether);

        // pre-act data
        uint256 preBalance = address(middleman).balance;
        uint256 preTotalSaved = middleman.totalSaved();

        // act
        middleman.entryPoint{ value: amount }(address(counter), abi.encodeWithSignature("increment()"));

        // post-act data
        uint256 postBalance = address(middleman).balance;
        uint256 postTotalSaved = middleman.totalSaved();

        // assertions
        assertEq(postBalance, preBalance + amount);
        assertEq(postTotalSaved, preTotalSaved + amount);
    }

    /// @dev tests entry point on middle man cannot be called if less than 0.0001 ether is sent
    //  - the contract should revert with the InsuffientValue error when amount is less than 0.0001 ether
    function testFuzzCannot_EntryPointInsufficientValue(uint256 amount) public {
        // assumptions
        vm.assume(amount < 0.0001 ether);

        // expectations
        vm.expectRevert(MiddleMan.InsuffientValue.selector);

        // act
        middleman.entryPoint{ value: amount }(address(counter), abi.encodeWithSignature("increment()"));
    }

    /// @dev tests that withdrawl fails if the time lock has not expired
    // - the contract should revert with the FundsLocked error if the time lock has not expired
    function testFuzzCannot_EntryPointFundsLocked(uint256 amount) public {
        // assumptions
        vm.assume(block.timestamp < middleman.timeLockInit() + 365 days);

        // expectations
        vm.expectRevert(MiddleMan.FundsLocked.selector);

        // act
        middleman.withdraw(amount);
    }

    /// @dev tests that state updates on a destination contract
    //  - the value of the counter contract should increase by 1
    function testFuzzIntegration_EntryPointCounterIncrement(uint256 amount) public {
        // assumptions
        amount = bound(amount, 0.0001 ether, 1 ether);

        // pre-act
        uint256 preCounter = counter.number();

        // act
        middleman.entryPoint{ value: amount }(address(counter), abi.encodeWithSignature("increment()"));

        // post-act
        uint256 postCounter = counter.number();

        // assertions
        assertEq(postCounter, preCounter + 1);
    }
}
