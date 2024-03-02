# Auto HODL

Auto HODL is a consumer DeFi framework for automatically saving a small amount of tokens as users perform their normal on-chain activity. In other words, Auto HODL is an on-chain equivalent of [Acorns](https://www.acorns.com/) and other round-up savings tools.

[ETH Denver 2024 presentation]()

## Architecture

### Terminology

- **Consumer dApp**: dApp UI that the end user wants to interact with. This might be uniswap.com, the Metamask interface for transferring ERC20, or any other UI that talks to the blockchain.
- **Savings Contract**: The on-chain contract that all the user's transactions passes through.
- **Target Contract**: The on-chain component of the Consumer dApp. 
- **Unlock Date**: The user defined date after which savings can be withdrawn.

### User flow
1. Alice sets up a Savings Contract and defines how much she wants to put in to savings for every transaction and what the Lockup Period will be.
1. Alice wants to do a swap on the Target Contract, 1inch, for 100 USDC to ETH
2. Auto HODL intercepts Alice's transaction and asks for a small amount of additional token before Alice signs the transaction.
3. The transaction is sent to the Savings Contract which deposits the extra amount into savings.
4. The Savings Contract forwards the swap request to the Target Contract (1inch) which processes the transaction normally.
5. After the Unlock Date, Alice can withdraw all her savings.

### Diagram

![Auto HODL design](auto-hodl-design-jpg)

## Getting started

### 1. Deploy contracts
```sh
$ cd backend
$ forge build
$ HODL_DEPLOY_KEY='XXX'

# Deploy Savings Contract
$ forge create src/Factory.sol:Factory \
    --private-key $HODL_DEPLOY_KEY \
    --rpc-url https://example.com 

# Deploy sample Target Contract
$ forge create src/Counter.sol:Counter \
    --private-key $HODL_DEPLOY_KEY \
    --rpc-url https://example.com 
```

### 2. Run sample dApp

```sh
$ cd interface
$ yarn
$ yarn dev
```


## Deployed addresses

|Network|Environment|Address|