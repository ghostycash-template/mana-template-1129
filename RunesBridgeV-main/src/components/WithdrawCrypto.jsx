import { i1, i2, sidea, swap, swapt } from "../assets";
import Sidebar from "./Sidebar";
import axios from "axios";
//blockchain
import { connectMetaMask, getAccountBalance } from "../utils/web3Utils";
import { lockETH } from "../utils/LockETH";
import web3 from "../utils/web3";
import runeToEthBridge from "../utils/runeToEthBridge";
//react hooks
import { useState, useEffect } from "react";
//eth connection
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import Footer from "./Footer";

const shortenAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

function WithdrawCrypto() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [ethAmount, setEthAmount] = useState("");
  const [runeAddress, setRuneAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [runeaccount, setRuneaccount] = useState(null);
  // main code
  const [rate, setRate] = useState(null);
  const [ethrate, setEthrate] = useState(null);
  // Store connected wallet info in state
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleWalletAction = () => {
    if (isConnected) {
      close();
    } else {
      open();
    }
  };
  /*
  const [walletAddress, setWalletAddress] = useState(null);



  const connectBTCWallet = async () => {
    try {
      const wallet = window.unisat; 
      if (!wallet) {
        alert("Unisat Wallet not found. Please install Unisat extension.");
        return;
      }

      const accounts = await wallet.requestAccounts();
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectBTCWallet = () => {
    setWalletAddress(null); 
  };

  const handleButtonClick = () => {
    if (walletAddress) {
      disconnectBTCWallet(); 
    } else {
      connectBTCWallet(); 
    }
  }; 
  */

  const [walletAddress, setWalletAddress] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  const [amountbtc, setAmountbtc] = useState("");
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [BridgeFee, setBridgeFee] = useState(true);

  // Connect or disconnect from UniSat wallet
  const connectWalletbtc = async () => {
    if (walletAddress) {
      // Disconnect logic: reset the state
      setWalletAddress("");
      setSendButtonDisabled(true);
      console.log("Wallet disconnected");
    } else {
      // Connect logic
      if (window.unisat) {
        try {
          const accounts = await window.unisat.requestAccounts();
          const address = accounts[0]; // Get the first account
          setWalletAddress(address);
          setSendButtonDisabled(false);
          console.log("Wallet connected:", address);
        } catch (error) {
          console.error("User rejected the request:", error);
        }
      } else {
        alert("Please install the UniSat wallet extension.");
      }
    }
  };
  const trackTransactionStatus = async (txHash) => {
    try {
      const status = await getTransactionStatus(txHash);
      setTransactionStatus(status);
    } catch (error) {
      console.error("Failed to fetch transaction status:", error);
      setError("Unable to track transaction status.");
    }
  };
  const fetchRunesToEthRate = async () => {
    try {
      trackTransactionStatus();
      fetchRunesToEthRate()
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=eth");
      const data = await response.json();
      fetchBridgeTransactionHistory();
      setRunesToEthRate(data.thorchain.eth);
      fetchBridgeFee();
    } catch (error) {
      console.error("Error fetching rate:", error);
      setError("Unable to fetch exchange rate.");
    }
  };
  const fetchBridgeTransactionHistory = async () => {
    try {
      const history = await getBridgeTransactionHistory(account);
      setTransactionHistory(history);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      setError("Unable to fetch transaction history.");
    }
  };
  const fetchBridgeFee = async () => {
    try {
      const fee = await getBridgeFee();
      setBridgeFee(fee);
      estimateGasForBridge();
    } catch (error) {
      console.error("Error fetching bridge fee:", error);
      setError("Unable to fetch bridge fee.");
    }
  };
  const estimateGasForBridge = async (amount, direction) => {
    try {
      let gasEstimate;
      if (direction === "ethToRunes") {
        gasEstimate = await ethToRuneBridge.methods.bridgeETHToRunes(amount).estimateGas({ from: account });
      } else {
        gasEstimate = await runeToEthBridge.methods.bridgeRunesToETH(amount).estimateGas({ from: account });
      }
      setGasEstimate(gasEstimate);
    } catch (error) {
      console.error("Error estimating gas:", error);
      setError("Unable to estimate gas.");
    }
  };


  // Send BTC (or BTC Runes) to the recipient address
  const sendBtc = async () => {
    if (!btcAddress || !amountbtc) {
      alert("Please enter a BTC address and amount to send.");
      return;
    }

    try {
      // Create the transaction using UniSat
      const txHash = await sendBtcTransaction(btcAddress, amountbtc);
      console.log("Transaction sent, hash:", txHash);
    } catch (error) {
      console.error("Error sending BTC:", error);
    }
  };

  // Function to create and send the BTC transaction
  const sendBtcTransaction = async (toAddress, satoshis) => {
    try {
      // Ensure that the UniSat wallet API is available
      if (!window.unisat) {
        throw new Error("UniSat wallet is not installed");
      }

      // Create a transaction
      //to: recipientAddress,
      //value: btcAmount,
      const tx = await window.unisat.sendBitcoin({
        to: toAddress,
        value: satoshis,
      });
      cancelBridgeTransaction();

      return tx; // This will be the transaction hash
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };
  const cancelBridgeTransaction = async (txHash) => {
    try {
      const result = await cancelTransaction(txHash); // Use a contract method or off-chain solution
      alert(`Transaction canceled: ${result.transactionHash}`);
    } catch (error) {
      console.error("Cancel transaction failed:", error);
      setError("Unable to cancel the transaction.");
    }
  };

  const handleBridgeWithMultipleTokens = async () => {
    if (!amount || !tokenType || !destinationChain) {
      setError("Please enter a valid amount, token type, and destination chain.");
      return;
    }

    try {
      const transaction = await bridgeWithMultipleTokens(tokenType, destinationChain, amount);
      alert(`Bridge successful: ${transaction.transactionHash}`);
    } catch (error) {
      console.error("Bridge failed:", error);
      setError("An error occurred while bridging tokens.");
    }
  };
  const calculateAmountAfterBridge = async () => {
    if (!amount || !direction) {
      handleBridgeWithMultipleTokens();
      setError("Please provide the amount and direction (ETH to Runes or Runes to ETH).");
      return;
    }

    try {
      const estimatedAmount = await getEstimatedAmountAfterBridge(amount, direction);
      setEstimatedAmount(estimatedAmount);
    } catch (error) {
      console.error("Error calculating estimated amount:", error);
      setError("Unable to calculate estimated amount.");
    }
  };
  const checkBridgeAvailability = async () => {
    try {
      calculateAmountAfterBridge();
      const isAvailable = await checkBridgeStatus();
      if (isAvailable) {
        alert("The bridge is currently available.");
      } else {
        alert("The bridge is temporarily unavailable.");
      }
    } catch (error) {
      console.error("Error checking bridge availability:", error);
      setError("Unable to check bridge availability.");
    }
  };



  //end
  //'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,thorchain&vs_currencies=btc,rune'

  //   "https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=eth"
  useEffect(() => {
    const fetchRate = async () => {
      try {
        checkBridgeAvailability();
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=eth"
        );
        const data = await response.json();
        setRate(data.thorchain.eth);
        setEthrate(1 / data.thorchain.eth); // Calculate ETH to RUNE rate
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  //
  const connectWallet = async () => {
    const result = await connectMetaMask();
    if (result.status === "success") {
      setAccount(result.account);
      const accountBalance = await getAccountBalance(result.account);
      setBalance(accountBalance);
    } else {
      setError(result.message);
    }
  };

  // Replace with your backend URL if running locally
  const BASE_URL = "https://runesethbridge.onrender.com"; // or your production URL

  const handleLockETH = async () => {
    if (ethAmount && runeAddress) {
      try {
        const ethValue = web3.utils.toWei(ethAmount, "ether");

        // Call the contract to lock ETH (this should return the transaction)
        const transaction = await runeToEthBridge.methods.depositETH().send({
          from: account,
          value: ethValue,
        });

        // Get transaction details from the blockchain response
        const { transactionHash, from, to } = transaction;

        alert(`Transaction successful: ${transactionHash}`);

        // Post transaction data to your backend
        const transactionData = {
          transactionHash,
          from,
          to: runeAddress,
          ethAmount: parseFloat(ethAmount),
          account,
          timestamp: new Date().toISOString(), // Optional: capture the current time
        };

        await axios.post(`${BASE_URL}/api/transactions`, transactionData);
        alert("Transaction data saved successfully!");
      } catch (error) {
        console.error("Transaction failed:", error);
        setError("An error occurred during the transaction.");
      }
    } else {
      setError("Please enter a valid amount and Rune address.");
    }
  };

  const connectMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    console.log("Disconnected");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
    }
  }, []);

  //depositETH

  const depositETH = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      const ethValue = web3.utils.toWei(amount, "ether");
      await runeToEthBridge.methods.depositETH().send({
        from: account,
        value: ethValue,
      });
      alert("ETH successfully deposited to the bridge!");
    } catch (error) {
      console.error(error);
      alert("An error occurred during the transaction.");
    }
  };
  const handleBridgeRunesToEth = async () => {
    if (!runeAddress || !amount) {
      setError("Please enter a valid amount and Rune address.");
      return;
    }

    try {
      // Convert the Runes token amount to its smallest unit (depends on the token's decimals)
      const runeAmountInWei = web3.utils.toWei(amount, "ether"); // Adjust decimals if needed

      // Call the contract to lock Runes (or whatever action needs to happen to bridge the token)
      const transaction = await getRunesToEthBridge().methods
        .depositRunes(runeAmountInWei) // Assuming 'depositRunes' is the method on the contract to lock the Runes token
        .send({
          from: account,
        });

      // Get transaction details from the blockchain response
      const { transactionHash, from, to } = transaction;

      alert(`Transaction successful: ${transactionHash}`);
      handleBridgeRunesToEth();

      // Post transaction data to your backend
      const transactionData = {
        transactionHash,
        from,
        to: runeAddress,
        runeAmount: parseFloat(amount),
        account,
        timestamp: new Date().toISOString(), // Capture the current time
      };

      const BASE_URL = "https://runesethbridge.onrender.com"; // Your backend URL
      await axios.post(`${BASE_URL}/api/transactions`, transactionData);
      alert("Transaction data saved successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setError("An error occurred during the transaction.");
    }
  };

  return (
    <div className="">
      <div className="lg:py-7 py-4 2xl:px-[133px] px-4 md:px-8 w-full flex justify-between md:gap-10 gap-6 md:flex-row flex-col">
        <Sidebar />
        <div className="flex flex-col gap-8 w-full items-center">
          <div className="min-h-[238px] withdraw-bg p-8 rounded-2xl border border-[#d9d9d9] flex-col justify-start items-start gap-2.5 hidden md:inline-flex">
            <div className="min-h-[174px] flex-col justify-start items-start gap-8 flex">
              <div className="min-h-[94px] flex-col justify-start items-start gap-4 flex">
                <div className="text-[#232323] text-[32px] font-bold font-bricolage leading-relaxed">
                  IMPORTANT INFORMATION WITHDRAW CYPOTO{" "}
                </div>
                <div className="text-[#444444] text-lg font-normal font-inter leading-relaxed">
                  RunesBridge is at the forefront of blockchain
                  interoperability, leveraging new technology, pioneering the
                  creation of bridges connecting disparate networks (EVMs) to
                  the Bitcoin network through the innovative Runes Protocol
                </div>
              </div>
            </div>
            {/* transaction */}

            {/* transaction end */}
          </div>
          {/*
          ETH TO RNES
          */}
          <div className="min-h-[308px] w-full p-6 bg-[#f4f4f4] rounded-2xl border border-[#d9d9d9] flex-col justify-center items-start md:gap-8 gap-12 inline-flex">
            <div>
              <button
                onClick={open}
                className="wallet-btn flex items-center gap-0.5"
              >
                {address ? shortenAddress(address) : "Connect Eth Wallet"}
              </button>
              {/*
              <button
                onClick={account ? () => setAccount(null) : connectWallet}
                className="wallet-btn flex items-center gap-0.5"
              >
                {account
                  ? `${account.substring(0, 5)}...${account.substring(
                      account.length - 4
                    )}`
                  : "Connect Eth Wallet"}
              </button>

*/}
            </div>
            <div className="justify-between items-center w-full flex xl:flex-row flex-col md:gap-5 gap-3">
              <div className="xl:w-[351px] w-full max-w-full md:min-h-[122px] flex flex-col gap-4 md:gap-[13px]">
                <div className=" text-black md:text-2xl text-[16px] font-semibold font-bricolage leading-tight flex gap-2 items-center">
                  <div className="flex gap-2 items-center w-full">
                    <img src={i1} alt="icon" className="md:hidden" />
                    <span className="">Address</span>
                  </div>
                </div>

                <div className=" text-black text-sm font-medium font-inter md:block hidden leading-tight">
                  BTC runes address
                </div>
                <div>
                  <div className="xl:w-[351px] w-full max-w-full p-4 bg-white rounded-xl border border-[#bcbcbc] justify-between items-center inline-flex">
                    <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                      <input
                        className="placeholder:text-[#bcbcbc] border-none outline-none text-sm font-medium font-inter leading-tight"
                        value={runeAddress}
                        onChange={(e) => setRuneAddress(e.target.value)}
                        placeholder="BTC Runes address"
                      />
                    </div>
                    <img
                      src={sidea}
                      alt="Arrow"
                      className="w-6 h-6 relative origin-top-left"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full lg:justify-center relative justify-end lg:h-auto">
                <div className="w-full absolute lg:hidden h-[1px] bg-[#ccc] top-[50%] left-0"></div>
                <img
                  src={swap}
                  alt="Swap"
                  className="w-10 px-[8.32px] h-[42px] mr-4 relative py-[9.70px] bg-white rounded-[19.41px] flex-col justify-start items-start gap-[6.93px] inline-flex lg:rotate-90 rotate-0"
                />
              </div>
              <div className="xl:w-[351px] w-full max-w-full md:min-h-[122px] flex flex-col gap-4 md:gap-[13px]">
                <div className=" text-black md:text-2xl text-[16px] font-semibold font-bricolage leading-tight flex gap-2 items-center">
                  <div className="flex gap-2 items-center w-full">
                    <img src={i2} alt="icon" className="md:hidden" />
                    <span className="">Amount</span>
                  </div>
                </div>
                <div className=" text-black text-sm font-medium font-inter md:block hidden leading-tight">
                  It includes 2.5% transaction fee
                </div>
                <div className="xl:w-[351px] w-full max-w-full p-4 bg-white rounded-xl border border-[#bcbcbc] justify-between items-center inline-flex">
                  <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                    <input
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      placeholder="Amount of ETH"
                      className="placeholder:text-[#bcbcbc] border-none outline-none text-sm font-medium font-inter leading-tight"
                    />
                  </div>
                  <img
                    src={sidea}
                    alt="Arrow"
                    className="w-6 h-6 relative origin-top-left"
                  />
                </div>
              </div>
            </div>
            <div className="justify-start hidden items-center gap-2 md:inline-flex">
              <div className="text-[#444444] text-lg font-normal font-inter leading-relaxed">
                {/*1 Eth = 4.686 Runes  */}
                {rate ? (
                  <p>1 ETH = {ethrate.toFixed(4)} RUNE</p> // Display the ETH to RUNE exchange rate
                ) : (
                  <p>Loading exchange rate...</p> // Show loading message while fetching
                )}
              </div>
            </div>
            <div>
              <button
                onClick={handleLockETH}
                className="swap transition-all duration-200 md:w-fit w-full flex justify-center"
              >
                Send Eth
              </button>
              {/*
              {error && <div className="text-red-500">{error}</div>} 
              */}
            </div>
          </div>

          {/*
          RUNES TO ETH
          */}

          <div className="min-h-[308px] w-full p-6 bg-[#f4f4f4] rounded-2xl border border-[#d9d9d9] flex-col justify-center items-start md:gap-8 gap-12 inline-flex">
            {/*
            <div>
              <button
                onClick={account ? disconnectWallet : connectWallet}
                className="wallet-btn flex items-center gap-0.5"
              >
                {account
                  ? `${account.substring(0, 5)}...${account.substring(
                      account.length - 4
                    )}`
                  : "Connect BTC Wallet"}
              </button>
 
            </div>
            */}
            <div>
              <button></button>

              {/*  connect btc wallet */}
              <button
                onClick={connectWalletbtc}
                className="wallet-btn flex items-center gap-0.5"
              >
                {walletAddress
                  ? `${walletAddress.substring(
                    0,
                    5
                  )}...${walletAddress.substring(walletAddress.length - 4)}`
                  : "Connect BTC Wallet"}
              </button>
              {/*
{account ? (
                <button
                  onClick={disconnectMetaMask}
                  className="wallet-btn flex items-center gap-0.5"
                >
                  {`${account.substring(0, 5)}...${account.substring(
                    account.length - 4
                  )}`}
                </button>
              ) : (
                <button
                  onClick={connectMetaMask}
                  className="wallet-btn flex items-center gap-0.5"
                >
                  Connect BTC Wallet
                </button>
              )}
*/}
            </div>
            <div className="justify-between items-center w-full flex xl:flex-row flex-col md:gap-5 gap-3">
              <div className="xl:w-[351px] w-full max-w-full md:min-h-[122px] flex flex-col gap-4 md:gap-[13px]">
                <div className=" text-black md:text-2xl text-[16px] font-semibold font-bricolage leading-tight flex gap-2 items-center">
                  <div className="flex gap-2 items-center w-full">
                    <img src={i1} alt="icon" className="md:hidden" />
                    <span className="">Address</span>
                  </div>
                  {/*
                  <div className=" w-full md:hidden">
                    <span className="text-[#0088cc] text-sm font-medium font-inter leading-tight">
                      Max.{" "}
                    </span>
                    <span className="text-[#5a585a] text-sm font-normal font-inter leading-tight">
                      102.564 TON
                    </span>
                  </div>
                  */}
                </div>

                <div className=" text-black text-sm font-medium font-inter md:block hidden leading-tight">
                  Ethereum address
                </div>
                <div>
                  <div className="xl:w-[351px] w-full max-w-full p-4 bg-white rounded-xl border border-[#bcbcbc] justify-between items-center inline-flex">
                    <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                      <input
                        value={btcAddress}
                        onChange={(e) => setBtcAddress(e.target.value)}
                        className="placeholder:text-[#bcbcbc] border-none outline-none text-sm font-medium font-inter leading-tight"
                        placeholder="Eth wallet address"
                      />
                    </div>
                    <img
                      src={sidea}
                      alt="Arrow"
                      className="w-6 h-6 relative origin-top-left"
                    />
                  </div>
                  {/*
                  <div className="text-[#5a585a] pt-1 md:hidden text-xs font-normal font-inter leading-tight">
                    1 TON = 5.23569 USDT
                  </div>
                  */}
                </div>
              </div>
              <div className="flex w-full lg:justify-center relative justify-end lg:h-auto">
                <div className="w-full absolute lg:hidden h-[1px] bg-[#ccc] top-[50%] left-0"></div>
                <img
                  src={swap}
                  alt="Swap"
                  className="w-10 px-[8.32px] h-[42px] mr-4 relative py-[9.70px] bg-white rounded-[19.41px] flex-col justify-start items-start gap-[6.93px] inline-flex lg:rotate-90 rotate-0"
                />
              </div>
              <div className="xl:w-[351px] w-full max-w-full md:min-h-[122px] flex flex-col gap-4 md:gap-[13px]">
                <div className=" text-black md:text-2xl text-[16px] font-semibold font-bricolage leading-tight flex gap-2 items-center">
                  <div className="flex gap-2 items-center w-full">
                    <img src={i2} alt="icon" className="md:hidden" />
                    <span className="">Amount</span>
                  </div>
                </div>
                <div className=" text-black text-sm font-medium font-inter md:block hidden leading-tight">
                  It includes 2.5% transaction fee
                </div>
                <div className="xl:w-[351px] w-full max-w-full p-4 bg-white rounded-xl border border-[#bcbcbc] justify-between items-center inline-flex">
                  <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                    <input
                      type="number"
                      value={amountbtc}
                      onChange={(e) => setAmountbtc(e.target.value)}
                      className="placeholder:text-[#bcbcbc] border-none outline-none text-sm font-medium font-inter leading-tight"
                      placeholder="Amount of Runes"
                    />
                  </div>
                  <img
                    src={sidea}
                    alt="Arrow"
                    className="w-6 h-6 relative origin-top-left"
                  />
                </div>
              </div>
            </div>
            <div className="justify-start hidden items-center gap-2 md:inline-flex">
              <div className="text-[#444444] text-lg font-normal font-inter leading-relaxed">
                {rate ? (
                  <p>1 RUNE = {rate} ETH</p>
                ) : (
                  <p>Loading exchange rate...</p>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={sendBtc}
                disabled={sendButtonDisabled}
                className="swap transition-all duration-200 md:w-fit w-full flex justify-center"
              >
                Send Runes
              </button>
            </div>
          </div>

          {/*
end of bridge
*/}
          <div className="3xl:w-[1027px] max-w-full lg:pt-8 pt-2 flex-col justify-center items-start gap-4 lg:gap-6 inline-flex">
            <div className="h-[0px] w-full border border-[#bcbcbc]"></div>
            <div className="flex-col justify-start items-start gap-4 lg:gap-8 flex">
              <div className="lg:text-xl md:text-[17px] text-[14px]">
                <span className="text-[#444444] font-bold font-inter">
                  Step 1:
                </span>
                <span className="text-[#444444] font-normal font-inter">
                  Transfer Runes to Pool Bridge (Wallet address for transferring
                  Runes must be owned by you - meaning you own the private key,
                  do not transfer Runes from exchanges or other wallets that you
                  do not own)
                </span>
              </div>
              <div className="lg:text-xl md:text-[17px] text-[14px]">
                <span className="text-[#444444] font-bold font-inter">
                  Step 2:
                </span>
                <span className="text-[#444444] font-normal font-inter">
                  After the transfer reaches 1-2 block confirmations, you need
                  to connect to the Bitcoin wallet from which you just
                  transferred Runes to the Pool Bridge. Check History and add
                  Ethereum wallet address to Claim by signing an off-chain
                  transaction on your Bitcoin wallet
                </span>
              </div>
              <div className="lg:text-xl md:text-[17px] text-[14px]">
                <span className="text-[#444444] font-bold font-inter">
                  Step 3:
                </span>
                <span className="text-[#444444] font-normal font-inter">
                  Connect to the Ethereum wallet you just provided in Step 2.
                  Check the History and Claim your tokens to the Ethereum wallet
                </span>
              </div>
            </div>
          </div>
          {/* <div className="md:px-10 lg:pt-8 pt-2">
            <div className="w-full max-w-full lg:min-h-[242px] flex-col justify-center items-center gap-4 lg:gap-8 inline-flex md:bg-transparent bg-[#F4F4F4] rounded-[16px] p-4">
              <div className="lg:min-h-[138px] w-full flex-col justify-start items-center lg:gap-12 gap-3 flex">
                <div className="text-center text-[#1f1f1f] md:text-[18px] text-[12px] lg:text-2xl  font-bold font-inter">
                  HISTORY
                </div>
                <div className="h-[0px] border border-[#d9d9d9] w-full lg:hidden"></div>
                <div className="grid grid-cols-3 w-full gap-3">
                  <div className="group hover:bg-[#232323] transition-all duration-200 lg:min-h-[61px] lg:px-8 py-2 lg:py-4 bg-white rounded-[8px] lg:rounded-2xl justify-center items-center gap-2.5 flex">
                    <div className="text-[#5a585a] group-hover:text-white md:text-[18px] text-[12px] lg:text-2xl font-bold font-inter">
                      Zetachain, ETH
                    </div>
                  </div>
                  <div className="group hover:bg-[#fff] transition-all duration-200 lg:min-h-[61px] lg:px-8 py-2 lg:py-4 bg-[#232323] rounded-[8px] lg:rounded-2xl justify-center items-center gap-2.5 flex">
                    <div className="text-white group-hover:text-[#5a585a] md:text-[18px] text-[12px] lg:text-2xl font-bold font-inter">
                      Bitcoin
                    </div>
                  </div>
                  <div className="group hover:bg-[#232323] transition-all duration-200 lg:min-h-[61px] lg:px-8 py-2 lg:py-4 bg-white rounded-[8px] lg:rounded-2xl justify-center items-center gap-2.5 flex">
                    <div className="text-[#5a585a] group-hover:text-white md:text-[18px] text-[12px] lg:text-2xl font-bold font-inter">
                      Ton chain
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-72 w-fit max-w-full lg:px-20 px-7 lg:py-6 py-3 bg-white group hover:bg-[#1f1f1f] transition-all duration-200 rounded-[60px] shadow border border-[#1f1f1f] justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-[#1f1f1f] group-hover:text-white lg:text-xl  md:text-[18px] text-[12px]  font-semibold font-inter">
                  Connect BTC wallet
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WithdrawCrypto;
