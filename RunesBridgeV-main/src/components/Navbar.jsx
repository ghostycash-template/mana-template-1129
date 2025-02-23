import { connectMetaMask, getAccountBalance } from "../utils/web3Utils";
import Web3 from "web3";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  git,
  line,
  logo,
  maskgroup,
  maskgroup2,
  maskgroup3,
  menu,
  telegram,
  xicon,
} from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { setNavOpen } from "../store/ui";
//reown
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";

const shortenAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

//  connecting the blockchain
function Navbar() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const { navOpen } = useSelector((store) => store);
  console.log(navOpen);
  const dispatch = useDispatch();

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

  // Function to disconnect MetaMask wallet
  const disconnectWallet = () => {
    setAccount(null); // Clears the account state, effectively "disconnecting"
  };

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

  return (
    <>
      <div className="lg:px-16 lg:py-7 py-4 md:px-8 px-4 h-15 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link to={"/blog"}>
            <div className="text-black md:text-2xl sm:text-[19px] text-[14px] font-normal font-lato">
              RunesBridge
            </div>
          </Link>
          <img
            src={logo}
            className="md:w-[35px] md:h-[39px] w-28px] h-[31px]"
            alt="Logo"
          />
        </div>
        <div className="links px-6 py-4 lg:flex hidden gap-5 items-center rounded-[12px] border-[1px] border-[#EEE] bg-[#F4F4F4]">
          <Link to={"/"}>
            <img src={telegram} alt="Telegram" />
          </Link>
          <img src={line} alt="Line" />
          <Link to={"/"}>
            <img src={git} alt="Git" />
          </Link>
          <img src={line} alt="Line" />
          <Link to={"/"}>
            <img src={xicon} alt="Xicon" />
          </Link>
          <img src={line} alt="Line" />
          <Link to={"/"}>
            <img src={maskgroup} alt="Maskgroup" />
          </Link>
          <img src={line} alt="Line" />
          <Link to={"/"}>
            <img src={maskgroup2} alt="maskgroup2" />
          </Link>
          <img src={line} alt="Line" />
          <Link to={"/"}>
            <img src={maskgroup3} alt="maskgroup3" />
          </Link>
        </div>
        <button onClick={open} className="wallet-btn flex items-center gap-0.5">
          {address ? shortenAddress(address) : "Connect Eth Wallet"}
        </button>
        {/*
<button
          onClick={account ? disconnectWallet : connectWallet}
          className="wallet-btn flex items-center gap-0.5"
        >
          {account
            ? `${account.substring(0, 5)}...${account.substring(
                account.length - 4
              )}`
            : "Wallet"}
        </button>

*/}
      </div>
      {navOpen && (
        <div className="links px-6 py-4 lg:hidden z-[100] absolute w-fit left-4 flex flex-col gap-5 items-center rounded-[12px] border-[1px] border-[#EEE] bg-[#F4F4F4]">
          <Link to={"/dashboard"}>
            <img src={telegram} alt="Telegram" />
          </Link>
          <img src={line} alt="Line" className="rotate-90" />
          <Link to={"/"}>
            <img src={git} alt="Git" />
          </Link>
          <img src={line} alt="Line" className="rotate-90" />
          <Link to={"/"}>
            <img src={xicon} alt="Xicon" />
          </Link>
          <img src={line} alt="Line" className="rotate-90" />
          <Link to={"/"}>
            <img src={maskgroup} alt="Maskgroup" />
          </Link>
          <img src={line} alt="Line" className="rotate-90" />
          <Link to={"/"}>
            <img src={maskgroup2} alt="maskgroup2" />
          </Link>
          <img src={line} alt="Line" className="rotate-90" />
          <Link to={"/"}>
            <img src={maskgroup3} alt="maskgroup3" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
