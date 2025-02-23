import { useSelector } from "react-redux";
import { blogi } from "../assets";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

function Blog() {

    const blogs = useSelector(state => state.blogs)

    return (
        <>
            <div className="">
                <div className="lg:py-7 py-4 2xl:px-[133px] px-4 md:px-8 w-full flex justify-between md:gap-10 gap-6 md:flex-row flex-col">
                    <Sidebar />
                    <div className="flex flex-col w-full max-w-full xl:py-[20px] xl:pt-0 py-4 pt-0">
                        <div className="w-full py-7 px-0 xl:px-[101px md:border-[#D9D9D9] md:border-dashed md:border-[1px] rounded-[60px] mt-0 sm:mt-12 md:mt-[44px] xl:mt-[80px]">
                            <div className="w-full max-w-full">
                                <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 md:-mt-[60px]">
                                    <div className="bg-white px-2">
                                        <span className="text-[#ff0025] text-[20px] xs:text-[28px] md:text-[36px] xl:text-5xl font-bold font-bricolage">Crypto </span>
                                        <span className="text-[#1f1f1f] text-[20px] xs:text-[28px] md:text-[36px] xl:text-5xl font-bold font-bricolage">blog</span>
                                    </div>
                                    <div className="max-w-full w-full overflow-x-hidden ">
                                        <div className="max-w-full w-full overflow-x-auto lg:flex lg:justify-center">
                                            <div className="flex gap-8 md:flex-wrap overflow-x-auto  md:max-w-[1000px] w-fit">
                                                {
                                                    blogs.map((blog, index) => (
                                                        <Link to={`/blog/${blog._id}`}>
                                                        <BlogCard blog={blog} key={index} />
                                                        </Link>
                                            ))
                                                }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-full pb-7 md:py-7 px-0 xl:px-[101px md:border-[#D9D9D9] md:border-dashed md:border-[1px] rounded-[60px] mt-0 sm:mt-12 md:mt-[44px] xl:mt-[80px]">
                        <div className="w-full max-w-full">
                            <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 md:-mt-[60px] justify-center">
                                <div className="bg-white px-2">
                                    <span className="text-[#ff0025] text-[20px] xs:text-[28px] md:text-[36px] xl:text-5xl font-bold font-bricolage">New listing </span>
                                    <span className="text-[#1f1f1f] text-[20px] xs:text-[28px] md:text-[36px] xl:text-5xl font-bold font-bricolage">token</span>
                                </div>
                                <div className="max-w-full w-full overflow-x-hidden ">
                                    <div className="max-w-full w-full overflow-x-auto lg:flex lg:justify-center">
                                        <div className="flex gap-8 md:flex-wrap overflow-x-auto md:max-w-[1000px] w-fit ">
                                            {
                                                blogs.map((blog, index) => (
                                                    <BlogCard blog={blog} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div >
        </>

    );
}

export default Blog;