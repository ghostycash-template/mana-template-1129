import { useEffect, useState } from "react";

const TransactionHistory = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/transactions/history/${walletAddress}`
        );
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    if (walletAddress) {
      fetchTransactions();
    }
  }, [walletAddress]);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.transactionHash}>
            <p>Amount: {tx.amount} ETH</p>
            <p>Token: {tx.tokenName}</p>
            <p>Receiver: {tx.receiver}</p>
            <p>Transaction Hash: {tx.transactionHash}</p>
            <p>Date: {new Date(tx.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
