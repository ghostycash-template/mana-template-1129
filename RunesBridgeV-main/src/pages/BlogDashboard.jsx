import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BlogCard,DashNav, SideNav } from "../components";

function BlogDashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  
  const blogs = useSelector((state) => state.blogs);
  
  return (
    <div className="min-h-screen w-full overflow-hidden relative flex bg-gray-100">
      <SideNav />
      <div className="flex flex-col w-full">
        <DashNav />
        <div className="flex-grow overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Blog Dashboard</h1>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 flex items-center space-x-2"
                onClick={() => navigate("/add")}
              >
                <span>Create New</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {blogs?.map((blog) => (
                <Link key={blog._id} to={`/blogs/${blog._id}`} className="block">
                  <div className="h-full">
                    <BlogCard blog={blog} />
                  </div>
                </Link>
              ))}
            </div>
            {blogs?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No blogs found. Create your first blog post!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDashboard;