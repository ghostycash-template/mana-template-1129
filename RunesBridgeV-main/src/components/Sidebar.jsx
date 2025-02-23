import { Link, useLocation } from "react-router-dom";
import { arroww, handd, handw, sidea } from "../assets";

function Sidebar() {
    const { pathname } = useLocation();
    return (
        <div className="sidebar-outer">
            <div className="flex md:flex-col items-center md:w-[unset] w-full sidebar">
                <Link to={"/dashboard"} className={`w-[255px] max-w-full md:h-14 md:pr-10 xxs:pr-2 xxs:pl-4 pr-1.5 pl-1.5 md:py-4 py-1.5 rounded-xl justify-between items-center gap-6 hidden md:inline-flex ${pathname == "/dashboard" ? "bg-[#5A585A] text-white" : "bg-white text-[#0f0f0f]"}`}>
                    <div className="h-6 justify-start items-center gap-2 flex">
                        {pathname == "/dashboard" ? <img src={handw} alt="Hand Wallet" /> : <img src={handd} alt="Hand dashboard" className="w-6 h-6 relative" />}
                        <div className="text-sm font-medium font-inter leading-tight">Dashboard</div>
                    </div>
                    <div className="md:block hidden">{pathname == "/dashboard" ? <img src={arroww} alt="Arrow White" /> : <img src={sidea} alt="Side arrow" className="w-6 h-6 relative origin-top-left" />}
                    </div>
                </Link>
                <Link to={"/withdraw"} className={`w-[255px] max-w-full md:h-14 md:pr-10 xxs:pr-2 xxs:pl-4 pr-1.5 pl-1.5 md:py-4 py-1.5 rounded-xl justify-between items-center gap-6 inline-flex ${pathname == "/withdraw" ? "bg-[#5A585A] text-white" : "bg-white text-[#0f0f0f]"}`}>
                    <div className="h-6 justify-start items-center gap-2 flex">
                        {pathname == "/withdraw" ? <img src={handw} alt="Hand Wallet" /> : <img src={handd} alt="Hand dashboard" className="w-6 h-6 relative" />}
                        <div className="text-sm font-medium font-inter leading-tight"><span className="md:block hidden">Withdraw Crypto</span><span className="md:hidden">Bridge</span></div>                    </div>
                    <div className="md:block hidden">{pathname == "/withdraw" ? <img src={arroww} alt="Arrow White" /> : <img src={sidea} alt="Side arrow" className="w-6 h-6 relative origin-top-left" />}
                    </div>
                </Link>
                <Link to={"/airdrop"} className={`w-[255px] max-w-full md:h-14 md:pr-10 xxs:pr-2 xxs:pl-4 pr-1.5 pl-1.5 md:py-4 py-1.5 rounded-xl justify-between items-center gap-6 inline-flex ${pathname == "/airdrop" ? "bg-[#5A585A] text-white" : "bg-white text-[#0f0f0f]"}`}>
                    <div className="h-6 justify-start items-center gap-2 flex">
                        {pathname == "/airdrop" ? <img src={handw} alt="Hand Wallet" /> : <img src={handd} alt="Hand dashboard" className="w-6 h-6 relative" />}
                        <div className="text-sm font-medium font-inter leading-tight">Airdrop</div>
                    </div>
                    <div className="md:block hidden">{pathname == "/airdrop" ? <img src={arroww} alt="Arrow White" /> : <img src={sidea} alt="Side arrow" className="w-6 h-6 relative origin-top-left" />}
                    </div>
                </Link>
                <Link to={"/stake"} className={`w-[255px] max-w-full md:h-14 md:pr-10 xxs:pr-2 xxs:pl-4 pr-1.5 pl-1.5 md:py-4 py-1.5 rounded-xl justify-between items-center gap-6 inline-flex ${pathname == "/stake" ? "bg-[#5A585A] text-white" : "bg-white text-[#0f0f0f]"}`}>                    <div className="h-6 justify-start items-center gap-2 flex">
                {pathname == "/stake" ? <img src={handw} alt="Hand Wallet" /> : <img src={handd} alt="Hand dashboard" className="w-6 h-6 relative" />}
                <div className="text-sm font-medium font-inter leading-tight">Stake</div>
                    </div>
                    <div className="md:block hidden">{pathname == "/stake" ? <img src={arroww} alt="Arrow White" /> : <img src={sidea} alt="Side arrow" className="w-6 h-6 relative origin-top-left" />}                    </div>
                </Link>
                <Link to={"/blog"} className={`w-[255px] max-w-full md:h-14 md:pr-10 xxs:pr-2 xxs:pl-4 pr-1.5 pl-1.5 md:py-4 py-1.5 rounded-xl justify-between items-center gap-6 inline-flex ${pathname == "/blog" ? "bg-[#5A585A] text-white" : "bg-white text-[#0f0f0f]"}`}>
                    <div className="h-6 justify-start items-center gap-2 flex">
                        {pathname == "/blog" ? <img src={handw} alt="Hand Wallet" /> : <img src={handd} alt="Hand dashboard" className="w-6 h-6 relative" />}
                        <div className="text-sm font-medium font-inter leading-tight"><span className="">Blogs</span></div>
                    </div>
                    <div className="md:block hidden">{pathname == "/blog" ? <img src={arroww} alt="Arrow White" /> : <img src={sidea} alt="Side arrow" className="w-6 h-6 relative origin-top-left" />}
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
