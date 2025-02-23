// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  runeAddress: { type: String, required: true },
  ethAmount: { type: Number, required: true },
  account: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
