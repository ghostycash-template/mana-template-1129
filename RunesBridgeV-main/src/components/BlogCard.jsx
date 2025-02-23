import React from 'react'

function BlogCard({ blog,link }) {

    return (
        <div className="w-[303px] p-4 bg-[#ffffff] rounded-2xl flex-col justify-center items-start gap-4 inline-flex">
            <div className="justify-start items-center gap-2 inline-flex">
                <img className="w-5 h-5 rounded" src={blog.img} alt="Blog Card Image" />
                <div className="text-[#1f1f1f] text-sm font-bold font-inter uppercase">{blog.title}</div>
            </div>
            <div className="flex-col justify-start items-start gap-4 flex">
                <div className="text-[#1f1f1f] text-sm font-bold font-inter uppercase">{blog.heading}</div>
                <div className="text-[#1f1f1f] text-xs font-normal font-inter capitalize" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
        </div>
    )
}

export default BlogCard
