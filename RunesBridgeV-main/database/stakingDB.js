require("dotenv").config();
const cors = require("cors");

const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const walletSchema = new mongoose.Schema({
  walletAddress: String,
  category: String,
  staking: {
    type: Array,
    default: [],
  },
  rewardAmount:Number,
  StakingAmount:Number,
});


const Wallet = mongoose.model("Wallet", walletSchema);

const parseDate = (dateValue) => {
  if (typeof dateValue === "string") {
    const [date, time] = dateValue.split(" ");
    return new Date(`${date}T${time}Z`);
  } else if (typeof dateValue === "number") {
    return new Date((dateValue - 25569) * 86400 * 1000);
  }
  return null;
};

app.get("/get-wallets", async (req, res) => {
  const filePath = path.join(__dirname, "transactions.xlsx");

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const groupedWallets = {};

    const june17 = new Date("2024-06-17T00:00:00Z");
    const august1 = new Date("2024-08-01T00:00:00Z");

    data.forEach((row, index) => {
      if (index === 0) return; // Skip header row

      const wallet = row[2]; // Wallet address
      const amount = parseFloat(row[6]);
      const dateTime = parseDate(row[5]); // Transaction date
      if (!dateTime || !amount || isNaN(amount)) {
        return;
      }

      if (!groupedWallets[wallet]) {
        groupedWallets[wallet] = {
          totalStakingAmount: 0,
          totalRewardAmount: 0,
          category: "", // Initialize category field
          transactions: [],
        };
      }

      let stakingAmount = 0;
      let rewardAmount = 0;
      let ruleApplied = "";

      // Determine rule based on transaction date
      if (dateTime < june17) {
        stakingAmount = amount / 2; // Stake 50%
        rewardAmount = amount; // Reward 100%
        ruleApplied = "Rule 1: soldBeforeJune17";
        groupedWallets[wallet].category = "soldBeforeJune17";
      } else if (dateTime >= june17 && dateTime < august1) {
        stakingAmount = amount / 4; // Stake 25%
        rewardAmount = amount; // Reward 100%
        ruleApplied = "Rule 2: purchasedBeforeAugust1AndSoldAfterJune17";
        groupedWallets[wallet].category = "purchasedBeforeAugust1AndSoldAfterJune17";
      } else if (dateTime >= august1) {
        stakingAmount = amount / 2; // Stake 50%
        rewardAmount = amount; // Reward 100%
        ruleApplied = "Rule 3: purchasedAfterJuly22";
        groupedWallets[wallet].category = "purchasedAfterJuly22";
      }

      groupedWallets[wallet].totalStakingAmount += stakingAmount;
      groupedWallets[wallet].totalRewardAmount += rewardAmount;
      groupedWallets[wallet].transactions.push({
        dateTime,
        amount,
        stakingAmount,
        rewardAmount,
        ruleApplied,
      });
    });

    const walletsForExcel = [];

    for (const walletAddress in groupedWallets) {
      const walletData = groupedWallets[walletAddress];
      const existingWallet = await Wallet.findOne({ walletAddress });

      if (existingWallet) {
        existingWallet.staking.push(...walletData.transactions);
        existingWallet.rewardAmount =
          (existingWallet.rewardAmount || 0) + walletData.totalRewardAmount;
        existingWallet.category = walletData.category;
        await existingWallet.save();
      } else {
        const newWallet = new Wallet({
          walletAddress,
          staking: [],
          rewardAmount: walletData.totalRewardAmount,
          category: walletData.category,
          StakingAmount:walletData.totalStakingAmount.toFixed(2)
        });
        await newWallet.save();
      }

      // Prepare data for Excel export
      walletsForExcel.push({
        walletAddress,
        totalStakingAmount: walletData.totalStakingAmount.toFixed(2),
        totalRewardAmount: walletData.totalRewardAmount.toFixed(2),
        category: walletData.category,
      });
    }

    // Create a new Excel file with wallet, staking, and reward information
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheetData = [
      ["Wallet Address", "Total Staking Amount", "Total Reward Amount", "Category"],
    ];

    walletsForExcel.forEach((wallet) => {
      newWorksheetData.push([
        wallet.walletAddress,
        wallet.totalStakingAmount,
        wallet.totalRewardAmount,
        wallet.category,
      ]);
    });

    const newWorksheet = xlsx.utils.aoa_to_sheet(newWorksheetData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "Wallet Staking & Rewards");

    const newFilePath = path.join(__dirname, "wallets_staking_rewards.xlsx");
    xlsx.writeFile(newWorkbook, newFilePath);

    res.json({
      message: "Wallets processed and saved successfully",
      excelFilePath: newFilePath, // Path to the new Excel file
    });
  } catch (error) {
    console.error("Error reading the Excel file:", error);
    res.status(500).json({ error: "Failed to process wallets" });
  }
});


app.get("/api/wallets", async (req, res) => {
  console.log("called")
  try {
    const wallets = await Wallet.find(); 
    res.json(wallets); 
  } catch (error) {
    console.error("Error fetching wallets:", error);
    res.status(500).json({ error: "Failed to fetch wallets" });
  }
});
// updated
app.get("/api/wallet-category/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  
  try {
    const wallet = await Wallet.findOne({ walletAddress });
    if (wallet) {
      res.json({ category: wallet.category, staking: wallet.staking, rewardAmount: wallet.rewardAmount});
    } else {
      res.status(404).json({ error: "Wallet not found" });
    }
  } catch (error) {
    console.error("Error fetching wallet category:", error);
    res.status(500).json({ error: "Failed to fetch wallet category" });
  }
});


app.post("/api/wallet-staking/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  const { stakedAmount, APR, LockDate, MaxUnlockDate, RewardsNow, RewardsMUD } = req.body;

  try {
    const wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const stakingEntry = {
      stakedAmount,
      APR,
      LockDate,
      MaxUnlockDate,
      RewardsNow,
      RewardsMUD,
    };

    const newStaking = new Staking({
      stakedAmount,
      aprDaily: APR,
      lockDate: LockDate,
      maxUnlockDate: MaxUnlockDate,
      rewardsNow: RewardsNow,
      rewardsMud: RewardsMUD,
    });

    await newStaking.save(); 

    wallet.staking.push(stakingEntry);

    // Save the updated wallet
    await wallet.save();

    res.json({ message: "Staking details added successfully", wallet });
  } catch (error) {
    console.error("Error adding staking details:", error);
    res.status(500).json({ error: "Failed to add staking details" });
  }
});


const stakingSchema = new mongoose.Schema({
  stakedAmount: String,
  aprDaily: String,
  lockDate: String,
  maxUnlockDate: String,
  rewardsNow: String,
  rewardsMud: String,
});

const Staking = mongoose.model("Staking", stakingSchema);

app.get("/api/staking-data", async (req, res) => {
  try {
    const stakingData = await Staking.find(); // Fetch all staking data from DB
    res.json(stakingData);
  } catch (error) {
    console.error("Error fetching staking data:", error);
    res.status(500).json({ error: "Failed to fetch staking data" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
