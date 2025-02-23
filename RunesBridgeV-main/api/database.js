import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Create __dirname and __filename in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://joblawal33:joblawal33@cluster0.kcjbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define transaction schema
const transactionSchema = new mongoose.Schema({
  transactionHash: String,
  from: String,
  to: String,
  ethAmount: Number,
  account: String,
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// POST /api/transactions route
app.post("/api/transactions", async (req, res) => {
  const { runeAddress, ethAmount, account, to } = req.body;

  try {
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    const transaction = new Transaction({
      transactionHash,
      from: account,
      to: runeAddress || to,
      ethAmount,
      account,
    });

    await transaction.save();

    console.log(`
      Transaction Details:
      Hash: ${transactionHash}
      From: ${transaction.from}
      To: ${transaction.to}
      Eth Amount: ${transaction.ethAmount}
      Account: ${transaction.account}
      Timestamp: ${transaction.timestamp}
    `);

    res
      .status(201)
      .json({ message: "Transaction saved successfully!", transaction });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: "Error saving transaction" });
  }
});

// GET /api/transactions route
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

// Serve static files from Vite build (for production)
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Export the app as a serverless function
export default (req, res) => {
  app(req, res);
};
