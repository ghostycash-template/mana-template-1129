const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const xlsx = require('xlsx'); 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbURI = '';

const walletSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  stake: { type: Number, required: true },
  reward: { type: Number, required: true },
  staked: { type: Array, default: [] },
});

const Wallet = mongoose.model('Wallet', walletSchema);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.post('/wallet/:address/stake', async (req, res) => {
  const walletAddress = req.params.address;
  const { stakingData } = req.body;  
  console.log(walletAddress)
  console.log(stakingData)
  if (!stakingData) {
    return res.status(400).json({ message: 'All staking data fields are required' });
  }

  try {
    const newStakedData = {
      stakedAmount: stakingData.stakedAmount,
      finalReward: stakingData.finalReward,
      startDate: stakingData.startDate,
      maxUnlockDate: stakingData.MaxUnlockDate ,  
      rewardsNow: stakingData.RewardsNow,
    };

    const wallet = await Wallet.findOneAndUpdate(
      { wallet: walletAddress }, 
      { $push: { staked: newStakedData } }, 
      { new: true } 
    );

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json({
      message: 'Staked data added successfully',
    });
  } catch (err) {
    console.error('Error updating staked data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/wallet/:address/empty-stake', async (req, res) => {
  const walletAddress = req.params.address;

  try {
    const wallet = await Wallet.findOneAndUpdate(
      { wallet: walletAddress },  
      { $set: { staked: [] } },  
      { new: true } 
    );

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json({
      message: 'Staked array emptied successfully',
    });
  } catch (err) {
    console.error('Error emptying staked array:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const saveWalletData = async (filePath) => {
  const workbook = xlsx.readFile(filePath);  
  const sheet = workbook.Sheets[workbook.SheetNames[0]];  
  const data = xlsx.utils.sheet_to_json(sheet); 
  
  for (let row of data) {
    const { wallet, stake, reward } = row;
    if (wallet && stake && reward) {
      const newWallet = new Wallet({
        wallet: wallet,
        stake: parseFloat(stake),  
        reward: parseFloat(reward),  
      });
      
      try {
        await newWallet.save();
        console.log(`Wallet data for ${wallet} saved successfully.`);
      } catch (err) {
        console.error(`Error saving data for ${wallet}:`, err);
      }
    }
  }
};

app.get('/process-file', async (req, res) => {
  const filePath = './rewards.xlsx';  
  
  try {
    await saveWalletData(filePath);  
    res.json({ message: 'File processed and data saved to the database successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error processing file', error: err });
  }
});

app.get('/wallet/:address', async (req, res) => {
  const walletAddress = req.params.address;

  try {
    const walletData = await Wallet.findOne({ wallet: walletAddress });

    if (walletData) {
      res.json({
        wallet: walletData.wallet,
        stake: walletData.stake,
        reward: walletData.reward,
        staked: walletData.staked,
      });
    } else {
      res.status(404).json({ message: 'Wallet not found' });
    }
  } catch (err) {
    console.error('Error fetching wallet data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
