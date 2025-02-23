import { Link } from "react-router-dom";
import { logol } from "../assets";
import { git, line, maskgroup, maskgroup2, maskgroup3, telegram, xicon } from "../assets";

function Footer() {
    return (
        <div className="xl:pt-[53px] pt-4 xl:px-[67px] gap-[29px] flex flex-col w-full max-w-full">
            <div className="flex gap-3 items-center xl:justify-start justify-center">
                <div className="text-black lg:text-[80px] h-fit xxs:text-[40px] md:text-[60px] text-[32px] xl:text-[120px] font-extrabold font-bricolage leading-[150%]">
                    Connect with
                </div>
                <img src={logol} className="lg:block hidden" alt="Large Logo" />
            </div>
            <div className="flex max-w-full md:flex-row md:items-start items-center flex-col w-full gap-6 xl:gap-[148px] lg:gap-[64px] xlg:gap-[211px] px-4">
                <div className="flex flex-col gap-6 w-fit items-center">
                    <div className="h-[169px] flex-col justify-start items-center gap-1.5 inline-flex">
                        <img className="w-[118px] h-[134px]" src={logol} />
                        <div className="text-black text-2xl font-normal font-lato">RunesBridgeV</div>
                    </div>
                    <div className="links py-4 lg:w-max flex gap-5 items-center justify-center rounded-[12px] flex-wrap">
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={telegram} alt="Telegram" />
                        </Link>
                        <img src={line} alt="Line" />
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={git} alt="Git" />
                        </Link>
                        <img src={line} alt="Line" />
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={xicon} alt="Xicon" />
                        </Link>
                        <img src={line} alt="Line" />
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={maskgroup} alt="Maskgroup" />
                        </Link>
                        <img src={line} alt="Line" />
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={maskgroup2} alt="maskgroup2" />
                        </Link>
                        <img src={line} alt="Line" />
                        <Link to={"/"}>
                            <img className="w-5 h-5" src={maskgroup3} alt="maskgroup3" />
                        </Link>
                    </div>
                    <div className="wallet-btn">Launch</div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-[15px] text-[#5a585a] text-[12px] md:text-[14px] lg:text-base font-medium font-inter leading-none">
                        <p className="text-black text-[12px] md:text-[14px] lg:text-lg font-semibold font-inter leading-tight pb-[3px]">Product</p>
                        <p className="">Security</p>
                        <p className="">Support</p>
                        <p className="">Alpha</p>
                    </div>
                    <div className="flex flex-col gap-[15px] text-[#5a585a] text-[12px] md:text-[14px] lg:text-base font-medium font-inter leading-none">
                        <p className="text-black text-[12px] md:text-[14px] lg:text-lg font-semibold font-inter leading-tight pb-[3px]">Company</p>
                        <p className="">Introducing Ctrl</p>
                        <p className="">$XDEFI</p>
                        <p className="">About</p>
                        <p className="">Privacy</p>
                        <p className="">Terms</p>
                    </div>
                    <div className="flex flex-col gap-[15px] text-[#5a585a] text-[12px] md:text-[14px] lg:text-base font-medium font-inter leading-none">
                        <p className="text-black text-[12px] md:text-[14px] lg:text-lg font-semibold font-inter leading-tight pb-[3px]">Resources</p>
                        <p className="">News</p>
                        <p className="">Docs</p>
                        <p className="">Media Kit</p>
                        <p className="">Shortcuts</p>
                    </div>
                    <div className="w-[77.67px] h-fit flex items-center gap-2.5">
                        <div className="text-[#5a585a] text-[12px] md:text-[14px] lg:text-base font-medium font-inter leading-none">English</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                            <path d="M6.85905 6.27011L2.47852 2.16225L3.75617 0.792969L6.85905 3.8054L9.96192 0.792969L11.2396 2.07097L6.85905 6.27011Z" fill="#5A585A" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full pb-8">
                <div className="justify-center w-full xxs:px-4 px-2 items-center gap-[15px] inline-flex">
                    <div className="justify-start items-center xxs:gap-4 gap-2 inline-flex">
                        <Link to="/" className="text-[#5a585a] text-xs font-medium font-inter leading-3 tracking-wide">Terms of use</Link>
                        <Link to="/" className="text-[#5a585a] text-xs font-medium font-inter leading-3 tracking-wide">Privacy policy</Link>
                        <Link to="/" className="text-[#5a585a] text-xs font-medium font-inter leading-3 tracking-wide">Cookie Preferences</Link>
                        <Link to="/login" onClick={()=>{window.scrollTo(0,0)}} className="text-[#5a585a] text-xs font-medium font-inter leading-3 tracking-wide">Admin</Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;