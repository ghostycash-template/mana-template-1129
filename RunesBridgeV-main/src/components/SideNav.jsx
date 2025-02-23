import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { setSideNavOpen } from "../store/ui";
import { logo } from "../assets";

function SideNav() {

    const pathname = window.location.pathname;
    const dispatch = useDispatch();
    const sideNavOpen = useSelector((state) => state.sideNavOpen)

    const isActiveLink = (path) => path === pathname;

    return (
        <div className={`side-nav lg:w-[260px] w-[59px] min-h-[100vh] h-[100%] pb-5 bg-white border-r border-[#d0d0d0] flex-col gap-[22px] flex ${sideNavOpen ? "left-0" : "-left-[100%] md:left-0 md:static"}`} >
            <Link to="/">
                <div className="h-[56px] lg:px-4 lg:py-2.3 py-2.5 border-b border-[#d0d0d0] items-start gap-2.5 flex justify-center lg:justify-between " >
                    <div className="logo justify-center items-center lg:flex hidden">
                        <img src={logo} alt="Nika Logo" />
                        <div className="h-[34px] pl-2 pr-[7px] py-1 justify-center items-center gap-1 inline-flex">
                            <div className="text-center text-[#070707] text-[22px] font-bold font-['Inter'] capitalize leading-tight">
                                RunesBridge
                            </div>
                        </div>
                    </div>
                    <img src={logo} alt="Nika Logo" className="lg:hidden h-[35px] w-[35px]" onClick={() => dispatch(setSideNavOpen(false))} />
                </div>
            </Link>
            <div className="h-[310px] lg:px-3 px-[7px] flex-col justify-start items-start gap-5 flex">
                <Link to="/blogs" className={`group self-stretch rounded justify-start items-center gap-2 inline-flex border ${isActiveLink('/blogs') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 0.5H2.16667C1.72464 0.5 1.30072 0.675595 0.988155 0.988155C0.675595 1.30072 0.5 1.72464 0.5 2.16667V6.33333C0.5 6.77536 0.675595 7.19928 0.988155 7.51184C1.30072 7.8244 1.72464 8 2.16667 8H5.5C5.94203 8 6.36595 7.8244 6.67851 7.51184C6.99107 7.19928 7.16667 6.77536 7.16667 6.33333V2.16667C7.16667 1.72464 6.99107 1.30072 6.67851 0.988155C6.36595 0.675595 5.94203 0.5 5.5 0.5ZM2.16667 6.33333V2.16667H5.5V6.33333H2.16667Z" fill={`${isActiveLink('/blogs') ? `black` : '#D0D0D0'}`} />
                            <path d="M13.8333 0.5H10.5C10.058 0.5 9.63405 0.675595 9.32149 0.988155C9.00893 1.30072 8.83333 1.72464 8.83333 2.16667V4.66667C8.83333 5.10869 9.00893 5.53262 9.32149 5.84518C9.63405 6.15774 10.058 6.33333 10.5 6.33333H13.8333C14.2754 6.33333 14.6993 6.15774 15.0118 5.84518C15.3244 5.53262 15.5 5.10869 15.5 4.66667V2.16667C15.5 1.72464 15.3244 1.30072 15.0118 0.988155C14.6993 0.675595 14.2754 0.5 13.8333 0.5ZM10.5 4.66667V2.16667H13.8333V4.66667H10.5Z" fill={`${isActiveLink('/blogs') ? `black` : '#D0D0D0'}`} />
                            <path d="M5.5 9.66667H2.16667C1.72464 9.66667 1.30072 9.84226 0.988155 10.1548C0.675595 10.4674 0.5 10.8913 0.5 11.3333V13.8333C0.5 14.2754 0.675595 14.6993 0.988155 15.0118C1.30072 15.3244 1.72464 15.5 2.16667 15.5H5.5C5.94203 15.5 6.36595 15.3244 6.67851 15.0118C6.99107 14.6993 7.16667 14.2754 7.16667 13.8333V11.3333C7.16667 10.8913 6.99107 10.4674 6.67851 10.1548C6.36595 9.84226 5.94203 9.66667 5.5 9.66667ZM2.16667 13.8333V11.3333H5.5V13.8333H2.16667Z" fill={`${isActiveLink('/blogs') ? `black` : '#D0D0D0'}`} />
                            <path d="M13.8333 8H10.5C10.058 8 9.63405 8.17559 9.32149 8.48816C9.00893 8.80072 8.83333 9.22464 8.83333 9.66667V13.8333C8.83333 14.2754 9.00893 14.6993 9.32149 15.0118C9.63405 15.3244 10.058 15.5 10.5 15.5H13.8333C14.2754 15.5 14.6993 15.3244 15.0118 15.0118C15.3244 14.6993 15.5 14.2754 15.5 13.8333V9.66667C15.5 9.22464 15.3244 8.80072 15.0118 8.48816C14.6993 8.17559 14.2754 8 13.8333 8ZM10.5 13.8333V9.66667H13.8333V13.8333H10.5Z" fill={`${isActiveLink('/blogs') ? `black` : '#D0D0D0'}`} />
                        </svg>
                    </div>
                    <div className="px-2 py-1.5 justify-center items-center gap-1 lg:flex hidden">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-sm font-medium font-inter leading-normal">Blogs</div>
                        </div>
                    </div>
                </Link>
                <Link to="/add" className={`group self-stretch rounded justify-start items-center gap-2 inline-flex border ${isActiveLink('/add') ? `border-[#D0D0D0] text-black p-[12px_13px]` : 'border-transparent p-[12px_13px] text-[#ababab]'}`}>
                    <div className="w-5 h-5 relative" >
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.00289 7.16653C6.66234 7.16653 7.30698 6.97098 7.85529 6.60461C8.40361 6.23824 8.83097 5.7175 9.08333 5.10825C9.33569 4.499 9.40172 3.82859 9.27306 3.18181C9.14441 2.53503 8.82686 1.94093 8.36055 1.47462C7.89425 1.00832 7.30015 0.690767 6.65337 0.562115C6.00659 0.433462 5.33618 0.499492 4.72693 0.751852C4.11768 1.00421 3.59694 1.43157 3.23057 1.97988C2.8642 2.5282 2.66865 3.17284 2.66865 3.83229C2.66865 4.71659 3.01993 5.56466 3.64523 6.18995C4.27052 6.81525 5.11859 7.16653 6.00289 7.16653ZM6.00289 2.16517C6.33261 2.16517 6.65494 2.26294 6.92909 2.44613C7.20325 2.62931 7.41693 2.88968 7.54311 3.19431C7.66929 3.49894 7.7023 3.83414 7.63798 4.15753C7.57365 4.48092 7.41487 4.77797 7.18172 5.01112C6.94857 5.24427 6.65152 5.40305 6.32813 5.46738C6.00474 5.5317 5.66954 5.49869 5.36491 5.37251C5.06028 5.24633 4.79992 5.03265 4.61673 4.75849C4.43354 4.48433 4.33577 4.16201 4.33577 3.83229C4.33577 3.39014 4.51141 2.9661 4.82406 2.65346C5.1367 2.34081 5.56074 2.16517 6.00289 2.16517Z" fill={`${isActiveLink('/profile') ? `black` : '#D0D0D0'}`} />
                            <path d="M6.00289 8.83365C4.45537 8.83365 2.97124 9.4484 1.87698 10.5427C0.782717 11.6369 0.167969 13.1211 0.167969 14.6686C0.167969 14.8896 0.25579 15.1017 0.412113 15.258C0.568436 15.4143 0.780455 15.5021 1.00153 15.5021C1.2226 15.5021 1.43462 15.4143 1.59094 15.258C1.74727 15.1017 1.83509 14.8896 1.83509 14.6686C1.83509 13.5632 2.2742 12.5031 3.05581 11.7215C3.83742 10.9399 4.89752 10.5008 6.00289 10.5008C7.10826 10.5008 8.16835 10.9399 8.94997 11.7215C9.73158 12.5031 10.1707 13.5632 10.1707 14.6686C10.1707 14.8896 10.2585 15.1017 10.4148 15.258C10.5712 15.4143 10.7832 15.5021 11.0043 15.5021C11.2253 15.5021 11.4373 15.4143 11.5937 15.258C11.75 15.1017 11.8378 14.8896 11.8378 14.6686C11.8378 13.1211 11.2231 11.6369 10.1288 10.5427C9.03454 9.4484 7.55041 8.83365 6.00289 8.83365Z" fill={`${isActiveLink('/profile') ? `black` : '#D0D0D0'}`} />
                        </svg>

                    </div>
                    <div className="px-2 py-1.5 justify-center items-center gap-1 lg:flex hidden">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-sm font-medium font-inter leading-normal">Add new</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideNav;
