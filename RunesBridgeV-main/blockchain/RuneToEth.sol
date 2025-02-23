// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RuneToEthBridge {
    address public admin;
    uint256 public transactionFee; // Fee in percentage (e.g., 100 = 1%)
    uint256 public accumulatedFees; // Total accumulated fees in ETH
    mapping(address => bool) public whitelist; // Whitelisted RUNE addresses exempt from fees

    event EthReleased(address indexed user, uint256 amount);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);
    event TransactionFeeSet(uint256 feePercentage);
    event WhitelistedAddressAdded(address indexed wallet);
    event WhitelistedAddressRemoved(address indexed wallet);
    event FeesWithdrawn(address indexed admin, uint256 amount);

    constructor() {
        admin = msg.sender;
        transactionFee = 100; // Default fee is 1% (100 = 1%)
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Function to release ETH to users when RUNE is detected in Thorchain
    function releaseETH(address to, uint256 amount) external onlyAdmin {
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        uint256 finalAmount = amount;
        // Apply transaction fee if not whitelisted
        if (!whitelist[to]) {
            uint256 fee = (amount * transactionFee) / 10000; // Transaction fee in wei
            accumulatedFees += fee; // Add fee to accumulated fees
            finalAmount = amount - fee;
        }

        payable(to).transfer(finalAmount); // Transfer the final amount after deducting fee
        emit EthReleased(to, finalAmount);
    }

    // Function to set transaction fee percentage (admin only)
    function setTransactionFee(uint256 newFee) external onlyAdmin {
        require(
            newFee <= 500,
            "Fee too high, must be less than or equal to 5%"
        ); // Limit to 5%
        transactionFee = newFee;
        emit TransactionFeeSet(newFee);
    }

    // Function to add wallet to the whitelist (admin only)
    function addToWhitelist(address wallet) external onlyAdmin {
        whitelist[wallet] = true;
        emit WhitelistedAddressAdded(wallet);
    }

    // Function to remove wallet from the whitelist (admin only)
    function removeFromWhitelist(address wallet) external onlyAdmin {
        whitelist[wallet] = false;
        emit WhitelistedAddressRemoved(wallet);
    }

    // Function to withdraw accumulated fees (admin only)
    function withdrawFees(address to) external onlyAdmin {
        require(accumulatedFees > 0, "No fees available to withdraw");
        uint256 fees = accumulatedFees;
        accumulatedFees = 0;
        payable(to).transfer(fees);
        emit FeesWithdrawn(to, fees);
    }

    // Function to deposit ETH into the bridge contract
    function depositETH() external payable {}

    // Transfer admin role to a new address (admin only)
    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin address cannot be zero");
        emit AdminTransferred(admin, newAdmin);
        admin = newAdmin;
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
//contract address on Eth testnet ===> 0x2e17Eb489a48D8cC2a15e928F53560528Bee9957
