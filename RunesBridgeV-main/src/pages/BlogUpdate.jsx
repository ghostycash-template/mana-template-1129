import { useState } from 'react';
import { DashNav, SideNav } from '../components';
import BlogItem from '../components/BlogItem';
import DeleteBlogPopup from '../components/DeleteBlogPopup';

function BlogUpdate() {

  const [deletePopup, setDeletePopup] = useState(false)

  return (
    <div className="h-[100vh] flex bg-[#f2f2f2]">
      <SideNav />
      <div className="flex h-[100vh]  w-[100%] flex-col">
        <DashNav />
        <div className="mx-4 md:mx-20 lg:mx-10 overflow-y-auto">
          <BlogItem setDeletePopup={setDeletePopup} />
        </div>

      </div>
      {
        deletePopup && <div className="w-[100vw] z-[100] h-[100vh] flex justify-center items-center absolute  bg-black/40 z-99">
          <DeleteBlogPopup setDeletePopup={setDeletePopup} />
        </div>
      }
    </div>
  )
}

export default BlogUpdate
