import { useState } from "react";
import { sidea } from "../assets";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Airdrop() {
    const [email, setEmail] = useState("");
    return (
        <div className="">
            <div className="lg:py-7 py-4 2xl:px-[133px] px-4 md:px-8 w-full flex justify-between md:gap-10 gap-6 md:flex-row flex-col">
                <Sidebar />
                <div className="w-full flex flex-col gap-6 ">
                    <div className="md:flex hidden flex-col w-full gap-4">
                        <div className="text-start text-black text-2xl font-bold font-bricolage">Airdrop</div>
                        <div className="text-start"><span className="text-black text-base font-normal font-inter capitalize">Enter EVM (0x) addresses to check your </span><span className="text-black text-base font-bold font-inter capitalize">$RDT</span><span className="text-black text-base font-normal font-inter capitalize"> tokens airdrop eligibility</span></div>
                    </div>
                    <div className="md:block hidden h-[0px] border border-[#666666]/30"></div>
                    <div className="p-6 w-full max-w-full 2xl:gap-[156px] gap-6 flex  justify-between rounded-[16px]  border-[1px] border-[#D9D9D9]">
                        <div className="justify-center w-full items-start gap-8 md:flex-row flex-col inline-flex">
                            <div className="max-w-[148px] flex-col justify-start items-start gap-[13px] inline-flex">
                                <div className="self-stretch text-black text-2xl font-semibold font-bricolage leading-tight">Address</div>
                                <div><span className="text-[#5a585a] text-sm font-normal font-inter leading-tight">Enter </span><span className="text-black text-sm font-bold font-inter leading-tight">Email Address </span></div>
                            </div>
                            <div className="w-full max-w-[688px] flex flex-col gap-8">
                                <div className="flex w-full gap-4 flex-col">
                                    <div className="flex p-4 justify-between items-center  w-full rounded-[12px]  border-[1px] border-[#BCBCBC]">
                                        <input type="text" name="email" id="email" className="placeholder:text-[#bcbcbc] text-sm font-medium font-inter leading-tight w-full border-none outline-none" placeholder="Enter address" onChange={(e) => setEmail(e.target.value)} />
                                        <img src={sidea} alt="Side arrow" />
                                    </div>
                                    <div className="text-[#5a585a] text-base font-normal font-inter leading-relaxed">Before using this Website, You will come under the privacy policy and terms of service.</div>
                                </div>
                                <div className="flex w-full xs:flex-row flex-col-reverse">
                                    <div className={`w-full text-center cursor-pointer transition-all duration-200 ${email != "" ? "text-[#232323]" : "text-[#bcbcbc]"} text-sm font-semibold font-inter leading-tight rounded-[60px] py-[14px] px-5 flex justify-center items-center `}>Information</div>
                                    <div className={`w-full text-center cursor-pointer transition-all duration-200 ${email != "" ? "bg-[#232323] text-white hover:text-[#232323] hover:bg-white" : "bg-[#bcbcbc] text-white hover:text-[#bcbcbc] hover:bg-white"} text-sm font-medium font-inter leading-tight rounded-[60px] py-[14px] px-5 flex justify-center items-center `}>Check</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Airdrop;