# Auto Hodl

-   Need to know the factory contract address.

If no child contract for current account exists, create one by:

1. Feeding to Savings Contract Constructor Args:
    - Static ETH Amount to send with every transaction
    - The target contract address
    - Deploy savings contract

If savings contract exists:

1.  Read state from contract and render it
2.  Hard code function selector
3.  Button will prompt the transaction
    -   Target contract action = increment
    -   Need to do this through Savings Contract

**Need to always render current counter and current savings account.**
