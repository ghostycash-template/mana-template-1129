import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import { message, Spin } from "antd";
import stakingABI from "./stakingABI";
import tokenABI from "./tokenABI";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

const tokenAddress = "0xf1Dec07e23073bD3855c3eaF7e274D6689e76dC7";
const stakingAddress = "0xAd48fE54f9da274CA5a8A5c0AC8D52EAFBB0C044";

function Stake() {
  const [amount, setAmount] = useState("");
  const [stakingData, setStakingData] = useState([]);
  const [stakingFetchedData, setStakingFetchedData] = useState([]);
  const [walletCategory, setwalletCategory] = useState(null);
  const [reward, setreward] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [walletCategoryText, setwalletCategoryText] = useState(null);
  const [CategoryTextvisible, setCategoryTextvisible] = useState(false);
  const [walletCategoryFactor, setwalletCategoryFactor] = useState(1);
  const [stateValue, setStateValue] = useState(0);
  const { open } = useAppKit();
  const { address } = useAccount();
  useEffect(() => {
    const fetchStakingData = async () => {
      try {
        const response = await axios.get(
          `https://staking-1.onrender.com/wallet/${address}`
        );
        setStakingFetchedData(response.data.staked);
        console.log(response.data.staked);
      } catch (error) {
        console.error("Error fetching staking data:", error);
      }
    };

    if (address) {
      fetchStakingData();
    }
  }, [address]);

  const fetchRewards = async () => {
    setCategoryTextvisible(true);
    // open()
    try {
      const url = `https://staking-1.onrender.com/wallet/${address}`;
      const response = await axios.get(url);
      console.log(response.data);
      setreward(response.data.reward);
      setAmount(response.data.stake);
      setCategoryTextvisible(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        console.error("Wallet connection error:", error);
        alert(error.message);
      }
      setCategoryTextvisible(false);
    }
  };
  const connectWallet = async () => {
    open();
  };

  useEffect(() => {
    // if (window.ethereum) {
    // const web3 = new Web3(window.ethereum);
    // web3.eth.getAccounts().then(async (accounts) => {
    //     if (accounts.length > 0) {
    //         setWalletAddress(accounts[0]);
    //     }
    // });

    // window.ethereum.on("accountsChanged", async (accounts) => {
    //     if (accounts.length > 0) {
    //         setWalletAddress(accounts[0]);
    //     }
    // });
    // }
    if (!address) {
      open();
    }
  }, []);
  const convertDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const approveToken = async () => {
    if (!address || !amount) {
      alert("Wallet address and amount are required.");
      return;
    }
    try {
      const web3 = new Web3(window.ethereum);
      const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
      const result = await tokenContract.methods
        .approve(stakingAddress, web3.utils.toWei(amount, "ether"))
        .send({ from: address });
      console.log("Approval successful:", result);
    } catch (error) {
      console.error("Approval error:", error);
      alert(`Approval failed: ${error.message}`);
    }
  };

  const stakeTokens = async () => {
    await approveToken();

    if (!address || !amount || !reward) {
      alert("Wallet address, amount, and reward are required.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);
      const weiAmount = web3.utils.toWei(amount, "ether");
      const weiReward = web3.utils.toWei(reward, "ether");
      console.log("Amount in wei:", weiAmount);
      console.log("Reward in wei:", weiReward);
      const estimatedGas = await stakingContract.methods
        .stake(weiAmount, weiReward)
        .estimateGas({ from: address });

      const gasLimit = Math.floor(Number(estimatedGas) * 1.2).toString();

      const result = await stakingContract.methods
        .stake(weiAmount, weiReward)
        .send({
          from: address,
          gas: gasLimit,
        });

      message.success("Stake successful");
      console.log("Stake successful:", result);

      handleStakingSubmit();
    } catch (error) {
      console.error("Stake error:", error);
      alert(`Staking failed: ${error.message}`);
    }
  };

  const submitStakingData = async (address, stakingData) => {
    try {
      const response = await fetch(
        `https://staking-1.onrender.com/wallet/${address}/stake`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stakingData }),
        }
      );

      console.log("Staking data submitted successfully:", response.data);
      alert("Staking details added successfully!");
    } catch (error) {
      console.error("Error submitting staking data:", error);
      alert(
        `Failed to submit staking data: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const handleStakingSubmit = () => {
    const stakingData = {
      stakedAmount: amount,
      finalReward: reward,
      startDate: new Date(Date.now()).toISOString(),
      MaxUnlockDate: new Date(
        Date.now() + 180 * 24 * 60 * 60 * 1000
      ).toISOString(),
      RewardsNow: "0",
    };

    console.log("Staking data:", stakingData);
    setStakingFetchedData([stakingData]);
    submitStakingData(address, stakingData);
  };

  const claimRewards = async () => {
    if (!address) {
      alert("Wallet address is required.");
      return;
    }
    try {
      const web3 = new Web3(window.ethereum);
      const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);
      const result = await stakingContract.methods
        .claimReward()
        .send({ from: address });
      console.log("Claim reward successful:", result);
    } catch (error) {
      console.error("Claim reward error:", error);
      alert(`Claim reward failed: ${error.message}`);
    }
  };
  const getRewardPercentage = (startDate) => {
    const startTime = new Date(startDate).getTime();
    const currentTime = new Date().getTime();
    const timeDiffInMinutes = (currentTime - startTime) / (1000 * 60);

    if (timeDiffInMinutes >= 3) {
      return 1;
    } else if (timeDiffInMinutes >= 2) {
      return 0.4;
    } else if (timeDiffInMinutes >= 1) {
      return 0.15;
    }
    return 0;
  };

  const withdrawTokens = async () => {
    if (!address) {
      alert("Please connect your wallet before proceeding.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);

      const estimatedGas = await stakingContract.methods
        .withdraw()
        .estimateGas({ from: address });

      const gasLimit = Math.floor(Number(estimatedGas) * 1.2);

      const confirmation = window.confirm(
        "You are about to withdraw your staked tokens and any rewards. Proceed?"
      );
      if (!confirmation) {
        return;
      }

      const result = await stakingContract.methods.withdraw().send({
        from: address,
        gas: gasLimit,
      });
      try {
        const response = await axios.get(
          `https://staking-1.onrender.com/wallet/${address}/empty-stake`
        );
        setStakingData([]);
        console.log(response.data);
      } catch (error) {
        console.error("Error removing data:", error);
      }

      alert(
        "Withdrawal successful! Tokens and rewards (if any) have been transferred to your wallet."
      );
      setStakingFetchedData([]);
      console.log("Withdrawal result:", result);
    } catch (error) {
      console.error("Withdrawal error:", error);

      if (error.message.includes("User denied transaction")) {
        alert("Transaction canceled by the user.");
      } else {
        alert(`Withdrawal failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="">
      <div className="lg:py-7 py-4 2xl:px-[133px] px-4 md:px-8 w-full flex justify-betwee md:gap-10 gap-6 md:flex-row flex-col">
        <Sidebar />
        <div className="w-full">
          <div className="2xl:w-[1021px w-full flex-col justify-start items-start xl:gap-6 md:gap-5 gap-4 flex">
            {/* flex flex-wrap justify-start items-center */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-6 xl:gap-6 md:gap-5 gap-4 w-full">
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px] order-1 border border-[#bcbcbc] justify-center items-center gap-2.5 flex md:order-1">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    Total Stake
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    19,262,198 RB{" "}
                  </span>

                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    -168,775$
                  </span>
                </div>
              </div>
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px] order-3 border border-[#bcbcbc] justify-center items-center gap-2.5 flex md:order-2">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    Total Rewards
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    0 ETH RB{" "}
                  </span>

                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    -$
                  </span>
                </div>
              </div>
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px] order-4 border border-[#bcbcbc] justify-center items-center gap-2.5 flex md:order-3">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    Total Points
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    15,775,654{" "}
                  </span>
                  <span className="text-transparent md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    1
                  </span>
                </div>
              </div>
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px]  order- border border-[#bcbcbc] justify-center items-center gap-2.5 hidden md:flex md:order-4">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    Total Stake
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    19,262,198 RB{" "}
                  </span>

                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    -168,775$
                  </span>
                </div>
              </div>
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px] order-5 border border-[#bcbcbc] justify-center items-center gap-2.5 flex md:order-5">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    APY
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    402.74%{" "}
                  </span>

                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    -$
                  </span>
                </div>
              </div>
              <div className="xl:p-6 md:p-[18px] xs:p-3 p-2 bg-[#fdfdfd] rounded-[10px] order-2 border border-[#bcbcbc] justify-center items-center gap-2.5 flex md:order-6 ">
                <div className="flex flex-col">
                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal pb-3">
                    Current epoch
                  </span>

                  <span className="text-black md:text-[24px] text-[16px] xl:text-[32px] font-bold font-inter capitalize">
                    15{" "}
                  </span>

                  <span className="text-black md:text-[16px] text-[12px] xl:text-[20px] font-medium font-inter capitalize leading-normal">
                    -reward 0.5 ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4 pt-8 md:pt-16 md:text-start text-center text-[#1f1f1f] text-2xl md:text-[30px] lg:text-[36px] xl:text-[40px] font-bold font-inter">
            Stake Earn Points & ETH
          </div>
          <div className="flex-col border-2 mb-5 p-4">
            <Spin tip="Fetching reward amount" spinning={CategoryTextvisible}>
              <div
                onClick={
                  address
                    ? () => {
                        setwalletCategoryText(null);
                        fetchRewards();
                      }
                    : connectWallet
                }
                className={`ml-96 w-60 mb-4 text-center cursor-pointer transition-all duration-200 bg-[#232323] text-white hover:text-[#232323] hover:bg-white text-sm font-medium font-inter leading-tight rounded-[60px] py-[14px] px-5 flex justify-center items-center `}
              >
                Check Wallet Rewards
              </div>
            </Spin>
            <p className="text-sm mb-4 text-center text-black">
              Connected Wallet:{" "}
              <span className="font-semibold text-black">
                {address || "No wallet connected"}
              </span>
            </p>
            {reward && (
              <>
                <p className=" text-green-500 ml-8 mb-5">{}</p>
                <div className="flex space-x-32 mb-8 ml-60">
                  <div>Reward Amount: {reward}</div>
                  <div>Amount to stake: {amount}</div>
                </div>
              </>
            )}
          </div>
          <div className="flex p-10 flex-col gap-5 lg:gap-6 w-full max-w-full border-[1px] border-[#D9D9D9] rounded-[16px]">
            <div className="w-full flex flex-col gap-5 items-center">
              <div className="text-center text-[#1f1f1f] text-[24px] lg:text-[32px] font-bold font-inter">
                Next Epoch:
              </div>
              <div className="flex lg:gap-5 gap-4">
                <div className="h-[102px] flex-col justify-start items-center gap-[21px] inline-flex">
                  <div className="w-[60px] h-16 p-[6.53px] bg-[#f4f4f4] rounded-[9.80px] flex-col justify-center items-center gap-[6.53px] flex">
                    <div className="text-center text-[#1f1f1f] text-sm font-bold font-inter">
                      1
                    </div>
                  </div>
                  <div className="text-center text-[#1f1f1f] text-sm font-normal font-inter">
                    Days
                  </div>
                </div>
                <div className="h-[102px] flex-col justify-start items-center gap-[21px] inline-flex">
                  <div className="w-[60px] h-16 p-[6.53px] bg-[#f4f4f4] rounded-[9.80px] flex-col justify-center items-center gap-[6.53px] flex">
                    <div className="text-center text-[#1f1f1f] text-sm font-bold font-inter">
                      23
                    </div>
                  </div>
                  <div className="text-center text-[#1f1f1f] text-sm font-normal font-inter">
                    Hours
                  </div>
                </div>
                <div className="h-[102px] flex-col justify-start items-center gap-[21px] inline-flex">
                  <div className="w-[60px] h-16 p-[6.53px] bg-[#f4f4f4] rounded-[9.80px] flex-col justify-center items-center gap-[6.53px] flex">
                    <div className="text-center text-[#1f1f1f] text-sm font-bold font-inter">
                      48
                    </div>
                  </div>
                  <div className="text-center text-[#1f1f1f] text-sm font-normal font-inter">
                    Minutes
                  </div>
                </div>
                <div className="h-[102px] flex-col justify-start items-center gap-[21px] inline-flex">
                  <div className="w-[60px] h-16 p-[6.53px] bg-[#f4f4f4] rounded-[9.80px] flex-col justify-center items-center gap-[6.53px] flex">
                    <div className="text-center text-[#1f1f1f] text-sm font-bold font-inter">
                      36
                    </div>
                  </div>
                  <div className="text-center text-[#1f1f1f] text-sm font-normal font-inter">
                    Seconds
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 lg:gap-8">
              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full justify-between items-center">
                  <div className="text-[#5a585a] text-sm md:text-[17px] lg:text-[20px] font-normal font-inter leading-relaxed">
                    Amount
                  </div>
                  <div className="text-[#5a585a] text-sm md:text-[17px] lg:text-[20px] font-normal font-inter leading-relaxed">
                    <span className="">Balance </span>
                    <span className="font-bold">ORB</span>
                  </div>
                </div>
                <div className="h-[52px] p-4 bg-white rounded-xl border border-[#bcbcbc] justify-between items-center inline-flex">
                  <input
                    className="justify-start items-center gap-2 flex text-black placeholder:pl-2 placeholder:text-[#bcbcbc] text-sm font-medium font-inter leading-tight w-full border-none outline-none"
                    type="text"
                    placeholder="Enter"
                    value={amount}
                    disabled
                  />
                  <div className="justify-end items-center gap-2 flex w-full text-[#bcbcbc] text-sm font-medium font-inter leading-tight">
                    MAX
                  </div>
                </div>
              </div>
              <div className="flex w-full xs:flex-row flex-col-reverse">
                <div
                  className={`w-full text-center cursor-pointer transition-all duration-200 text-[#232323]" text-sm font-semibold font-inter leading-tight rounded-[60px] py-[14px] px-5 flex justify-center items-center `}
                >
                  Cancel
                </div>
                <div
                  className={`w-full text-center cursor-pointer transition-all duration-200 bg-[#232323] text-white hover:text-[#232323] hover:bg-white text-sm font-medium font-inter leading-tight rounded-[60px] py-[14px] px-5 flex justify-center items-center `}
                  onClick={stakeTokens}
                >
                  Approve
                </div>
              </div>
              <div className="border-2 staking-table p-6 bg-white text-black rounded-lg shadow-lg max-w-full overflow-auto my-8">
                <table className="table-auto w-full text-left ">
                  <thead>
                    <tr className="bg-white text-black">
                      <th className="p-4 border-r-2">Staked Amount</th>
                      <th className="p-4 border-r-2">Final Reward</th>
                      <th className="p-4 border-r-2">Start Date</th>
                      <th className="p-4 border-r-2">Max Unlock Date (MUD)</th>
                      <th className="p-4 border-r-2">Rewards (Now)</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stakingFetchedData.map((data, index) => {
                      const rewardPercentage = getRewardPercentage(
                        data.startDate
                      );
                      const rewardAmount = data.finalReward * rewardPercentage;
                      return (
                        <tr
                          key={index}
                          className="bg-white text-black hover:bg-gray-200 transition-colors"
                        >
                          <td className="p-4">{data.stakedAmount}</td>
                          <td className="p-4">{data.finalReward}</td>
                          <td className="p-4">{convertDate(data.startDate)}</td>
                          <td className="p-4">
                            {convertDate(data.maxUnlockDate)}
                          </td>{" "}
                          {/* Adding 180 days */}
                          <td className="p-4">{rewardAmount}</td>{" "}
                          <td className="p-4">
                            <button
                              onClick={withdrawTokens}
                              className="px-4 py-2 rounded bg-white text-black hover:bg-gray-200 transition-colors"
                            >
                              Claim and Unstake
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stake;
