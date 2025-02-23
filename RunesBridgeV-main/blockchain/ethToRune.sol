// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthereumToRuneBridge {
    address public admin;
    uint256 public feePercentage; // Fee stored as an integer. e.g., 250 = 2.5%
    mapping(address => bool) public exemptAddresses;
    uint256 public totalAccumulated;

    event LockETH(
        address indexed user,
        uint256 amountLocked,
        uint256 feeAmount,
        string runeAddress,
        uint256 timestamp
    );
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);
    event FeePercentageUpdated(uint256 newFeePercentage);
    event FundsTransferred(address indexed to, uint256 amount);
    event ExemptAddressUpdated(address indexed user, bool isExempt);

    constructor() {
        admin = msg.sender;
        feePercentage = 250; // Default 2.5% fee (can be updated by admin)
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // User sends a total amount, and 2.5% fee is deducted from the amount they specify
    function lockETH(string memory runeAddress) external payable {
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 amountToLock = msg.value;
        uint256 feeAmount = calculateFee(amountToLock);
        uint256 amountAfterFee = amountToLock - feeAmount; // Subtract the fee from the total amount

        // Check if the user is exempt from fees
        if (exemptAddresses[msg.sender]) {
            amountAfterFee = amountToLock; // No fee deducted for exempt addresses
            feeAmount = 0; // No fee for exempt addresses
        }

        totalAccumulated += feeAmount;

        emit LockETH(
            msg.sender,
            amountAfterFee,
            feeAmount,
            runeAddress,
            block.timestamp
        );
    }

    function calculateFee(uint256 amount) public view returns (uint256) {
        // feePercentage is divided by 10000 to support decimal percentages (e.g., 250 = 2.5%)
        return (amount * feePercentage) / 10000;
    }

    function withdrawFees() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }

    function setFeePercentage(uint256 _feePercentage) external onlyAdmin {
        feePercentage = _feePercentage; // For example, pass 250 for 2.5%
        emit FeePercentageUpdated(_feePercentage);
    }

    function getTotalAccumulated() external view onlyAdmin returns (uint256) {
        return totalAccumulated;
    }

    function transferAccumulatedFunds(address to) external onlyAdmin {
        uint256 amount = totalAccumulated;
        totalAccumulated = 0;
        payable(to).transfer(amount);
        emit FundsTransferred(to, amount);
    }

    function setExemptAddress(address user, bool isExempt) external onlyAdmin {
        exemptAddresses[user] = isExempt;
        emit ExemptAddressUpdated(user, isExempt);
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin address cannot be zero");
        emit AdminTransferred(admin, newAdmin);
        admin = newAdmin;
    }
}
//contract address on Eth testnet ==> 0x307fEa2742660f32c5b35FeFa98f6d4069481adF
