import {
  chain1,
  chain2,
  chain3,
  chain4,
  chainarrow,
  di1,
  di2,
  di3,
  di4,
} from "../assets";
import Sidebar from "./Sidebar";
import axios from "axios";
import Footer from "./Footer";

import React, { useState, useEffect } from "react";
function Dashboard() {
  //backend
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from backend
  //const apiUrl =  "http://localhost:5001/api";

  useEffect(() => {
    axios
      .get("https://runesethbridge.onrender.com/api/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  //backend stops
  /*
   */
  const dashboardData = [
    {
      date: "2 days ago",
      token: "RUNESBRIDGEXYZ",
      amount: "1",
      chain: {
        from: chain1,
        to: chain2,
      },
      from: "0xd97e...b38ad7",
      to: "0xd97e...b38ad7",
      deposit: "0xd97e...b38ad7",
      withdraw: "-",
      status: "Waiting Claim",
    },
    {
      date: "9 days ago",
      token: "RUNESBRIDGEXYZ",
      amount: "40,001",
      chain: {
        from: chain3,
        to: chain2,
      },
      from: "0xd97e...b38ad7",
      to: "-",
      deposit: "0xd97e...b38ad7",
      withdraw: "-",
      status: "Processing",
    },
    {
      date: "10 days ago",
      token: "RUNESBRIDGEXYZ",
      amount: "85,000,34",
      chain: {
        from: chain4,
        to: chain2,
      },
      from: "0xd97e...b38ad7",
      to: "0xd97e...b38ad7",
      deposit: "0xd97e...b38ad7",
      withdraw: "0xd97e...b38ad7",
      status: "Completed",
    },
    {
      date: "14 days ago",
      token: "RUNESBRIDGEXYZ",
      amount: "77290",
      chain: {
        from: chain1,
        to: chain2,
      },
      from: "0xd97e...b38ad7",
      to: "0xd97e...b38ad7",
      deposit: "0xd97e...b38ad7",
      withdraw: "0xd97e...b38ad7",
      status: "Completed",
    },
    {
      date: "18 days ago",
      token: "RUNESBRIDGEXYZ",
      amount: "123,909",
      chain: {
        from: chain2,
        to: chain4,
      },
      from: "0xd97e...b38ad7",
      to: "0xd97e...b38ad7",
      deposit: "0xd97e...b38ad7",
      withdraw: "0xd97e...b38ad7",
      status: "Completed",
    },
  ];
  return (
    <div className="">
      {/*backend stops*/}
      <div className="lg:py-7 py-4 2xl:px-[133px] px-4 md:px-8 w-full flex justify-between md:gap-10 gap-6 md:flex-row flex-col">
      <Sidebar />
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 xxs:grid-cols-4 grid-cols-2 2xl:gap-16 sm:gap-8 gap-4 h-fit">
          <div className="xl:p-4 md:p-2 p-1.5 rounded-xl border border-[#bcbcbc] flex-col justify-center items-center xl:gap-3 md:gap-2 gap-1 inline-flex ">
            <img
              className="xl:w-20 md:w-[55px] sm:w-[48px] w-[30px] xl:h-20 md:h-[55px] sm:h-[48px] h-[30px] relative"
              src={di1}
              alt="Dashboard Icon"
            />
            <div className="text-center text-[#0f0f0f] xl:text-xl md:text-[13px] text-[8px] font-normal font-inter">
              Assets Supported
            </div>
            <div className="text-center text-[#0f0f0f] xl:text-[40px] md:text-[24px] xs:text-[18px] text-[14px] font-bold font-inter">
              4
            </div>
          </div>
          <div className="xl:p-4 md:p-2 p-1.5 rounded-xl border border-[#bcbcbc] flex-col justify-center items-center xl:gap-3 md:gap-2 gap-1 inline-flex ">
            <img
              className="xl:w-20 md:w-[55px] sm:w-[48px] w-[30px] xl:h-20 md:h-[55px] sm:h-[48px] h-[30px] relative"
              src={di2}
              alt="Dashboard Icon"
            />
            <div className="text-center text-[#0f0f0f] xl:text-xl md:text-[13px] text-[8px] font-normal font-inter">
              Total Volume
            </div>
            <div className="text-center text-[#0f0f0f] xl:text-[40px] md:text-[24px] xs:text-[18px] text-[14px] font-bold font-inter">
              $79,556
            </div>
          </div>
          <div className="xl:p-4 md:p-2 p-1.5 rounded-xl border border-[#bcbcbc] flex-col justify-center items-center xl:gap-3 md:gap-2 gap-1 inline-flex ">
            <img
              className="xl:w-20 md:w-[55px] sm:w-[48px] w-[30px] xl:h-20 md:h-[55px] sm:h-[48px] h-[30px] relative"
              src={di3}
              alt="Dashboard Icon"
            />
            <div className="text-center text-[#0f0f0f] xl:text-xl md:text-[13px] text-[8px] font-normal font-inter">
              RB PRICE
            </div>
            <div className="text-center text-[#0f0f0f] xl:text-[40px] md:text-[24px] xs:text-[18px] text-[14px] font-bold font-inter">
              $0.009
            </div>
          </div>
          <div className="xl:p-4 md:p-2 p-1.5 rounded-xl border border-[#bcbcbc] flex-col justify-center items-center xl:gap-3 md:gap-2 gap-1 inline-flex ">
            <img
              className="xl:w-20 md:w-[55px] sm:w-[48px] w-[30px] xl:h-20 md:h-[55px] sm:h-[48px] h-[30px] relative"
              src={di4}
              alt="Dashboard Icon"
            />
            <div className="text-center text-[#0f0f0f] xl:text-xl md:text-[13px] text-[8px] font-normal font-inter">
              BTC Fee Rate
            </div>
            <div className="text-center text-[#0f0f0f] xl:text-[40px] md:text-[24px] xs:text-[18px] text-[14px] font-bold font-inter">
              4
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block mt-10 w-full h-[1px] bg-[#bcbcbc]"></div>
      <div className="lg:py-10 py-2 2xl:px-[133px] px-4 md:px-8 w-full max-w-full flex justify-between md:gap-10 gap-6 md:flex-row flex-col w-full">
        <div className="p-6 lg:p-10 rounded-[16px] border-[#D9D9D9] border-[1px] bg-white shadow-md max-w-full">
          <div className="overflow-x-auto dashboard max-w-full">
            <div className="grid grid-cols-5 md:min-w-[1350px] min-w-[900px] items-center gap-[21px] text-[#1f1f1f] text-[16px] md:text-xl font-semibold font-inter text-center bg-[#F4F4F4] p-3 rounded-t-lg">
              <div className="">Date</div>
              <div className="">Amount</div>
              <div className="">Tx-hash</div>
              <div className="">from</div>
              <div className="">To</div>
            </div>
            {/*
            {dashboardData.map((item, key) => (
              <div
                key={key}
                className="grid grid-cols-9 md:min-w-[1350px] min-w-[900px] items-center gap-[21px] text-[#1f1f1f] text-center text-[12px] md:text-base font-normal font-inter"
              >
                <div className="">{item.date}</div>
                <div className="">{item.token}</div>
                <div className="">{item.amount}</div>
                <div className="flex justify-center gap-[14px] items-center">
                  <img src={item.chain.from} alt="from" />
                  <img src={chainarrow} alt="ChainArrow" />
                  <img src={item.chain.to} alt="to" />
                </div>
                <div className="">{item.from}</div>
                <div className="">{item.to}</div>
                <div className="">{item.deposit}</div>
                <div className="">{item.withdraw}</div>
                <div
                  className={`${
                    item.status == "Waiting Cliam"
                      ? "text-[#FFAE00]"
                      : item.status == "Processing"
                      ? "text-[#FF3434]"
                      : "text-[#19D300]"
                  }`}
                >
                  {item.status}
                </div>
              </div>
            ))}
            */}
            {transactions.length > 0 ? (
              transactions.map((transaction, key) => (
                <div
                  key={key}
                  className={`grid grid-cols-5 md:min-w-[1350px] min-w-[900px] items-center gap-[21px] text-[#1f1f1f] text-center text-[12px] md:text-base font-normal font-inter py-4 ${key % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"}`}
                >
                  <div>{new Date(transaction.timestamp).toLocaleString()}</div>
                  <div>{transaction.ethAmount}</div>
                  <div className="truncate">{transaction.transactionHash}</div>
                  <div className="truncate">{transaction.account}</div>
                  <div className="truncate">{transaction.to}</div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                Loading Transactions history...
              </div>
            )}
            {/* backends*/}
          </div>
        </div>
      </div>
      <div className="py-12 justify-center w-full items-center gap-8 inline-flex ">
        <div className="justify-start items-center gap-4 flex">
          <div className="px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
            >
              <path
                d="M1.27429 6.19998L9.05075 0.876244C9.40988 0.630212 9.77173 0.5 10.0725 0.5C10.654 0.5 11.0137 0.966678 11.0137 1.74784V13.254C11.0137 14.0342 10.6544 14.5 10.0743 14.5C9.77309 14.5 9.41702 14.3697 9.05709 14.123L1.27701 8.79934C0.776675 8.45642 0.499592 7.99495 0.499592 7.49938C0.499478 7.00414 0.773388 6.54279 1.27429 6.19998Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="w-[30px] h-[31px] p-2.5 bg-[#f4f4f4] rounded-[5px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-[#1d1f23] text-base font-normal font-lato">
                1
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="w-[30px] h-[31px] p-2.5 bg-[#f4f4f4]/0 rounded-[5px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-[#1d1f23] text-base font-normal font-lato">
                2
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="w-[30px] h-[31px] p-2.5 bg-[#f4f4f4]/0 rounded-[5px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-[#1d1f23] text-base font-normal font-lato">
                3
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="w-[30px] h-[31px] p-2.5 bg-[#f4f4f4]/0 rounded-[5px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-[#1d1f23] text-base font-normal font-lato">
                4
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-8 flex">
            <div className="w-[30px] h-[31px] p-2.5 bg-[#f4f4f4]/0 rounded-[5px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-[#1d1f23] text-base font-normal font-lato">
                5
              </div>
            </div>
          </div>
          <div className="px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
            >
              <path
                d="M9.75305 6.19998L1.9766 0.876244C1.61747 0.630212 1.25562 0.5 0.954847 0.5C0.37337 0.5 0.0136719 0.966678 0.0136719 1.74784V13.254C0.0136719 14.0342 0.372917 14.5 0.953034 14.5C1.25426 14.5 1.61033 14.3697 1.97025 14.123L9.75033 8.79934C10.2507 8.45642 10.5278 7.99495 10.5278 7.49938C10.5279 7.00414 10.254 6.54279 9.75305 6.19998Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
