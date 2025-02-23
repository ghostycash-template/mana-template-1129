import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BreadCrumb, Footer } from "../components";

function BlogPage() {

  const { id} = useParams();

  const [blog,setBlog] = useState({ img: "",    title: "", heading: "", createdAt:  "", _id: "", content: ""})

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
      setBlog(res.data.blog);
      console.log(res)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchBlog()
  },[]);

  return (
    <>
      <BreadCrumb />
      <div className="flex w-full justify-center lg:px-[80px]">
        <div className="w-[1200px] max-w-full lg:pt-8 lg:pb-[60px] lg:px-0 sm:p-[25px_40px] p-[25px_16px]">
          <div className="flex gap-8 justify-center items-start w-full">
            <div className="flex flex-col w-full gap-7 md:w-[876px]">
              <div className="w-full flex justify-center" id="digital-finance">
                <img src={blog.img || ''} className="w-full max-w-[276px] md:h-[387px" alt="" />
              </div>
              <div className="text-[#070707] sm:text-[52px] text-[33px] font-HelveticaNeueCyr leading-[42px] font-[550]">
                {blog.title}
              </div>
              <div className="text-[#070707] sm:text-[42px] text-[28px] font-HelveticaNeueCyr leading-[42px] font-[550]">
                {blog.heading}
              </div>
             
              <div className="overflow-hidden flex flex-col" dangerouslySetInnerHTML={{ __html: blog.content }}>
              </div>
             </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-[75px] h-[25px]"></div>
      {/* <Signup /> */}
      <Footer/> 
    </>
  );
}

export default BlogPage;
