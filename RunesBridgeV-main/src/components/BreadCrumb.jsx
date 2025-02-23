import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

function BreadCrumb() {

  const location = useLocation();

  const { id } = useParams();

  let path = "";
  
  const blogs = useSelector((state) => state.blogs);

  const breadcrumb = location.pathname.split("/").map((item) => {
    if (item == "") {
      return {
        name: "Home",
        path: "/",
      };
    } else {
      path += "/";
      path += item;
      return {
        name: item === id ? blogs.filter(blog => blog._id === id)[0]?.title : item,
        path: path,
      };
    }
  });

  return (
    <div className="w-full bg-[rgba(0,0,0,0.03)] h-[28px] flex justify-center">
      <div className="w-[1200px] max-w-[100%] sm:px-10 px-4 py-1 flex gap-3 items-center">
        {breadcrumb.map((item, ind) => (
          <Link
            key={String(ind) + "Unique"}
            to={item.path}
            className="flex gap-3 items-center"
          >
            <p className="font-['Inter'_,sans-serif] overflow-hidden line-clamp-1">
              {item.name}
            </p>
            {ind != breadcrumb.length - 1 && (
              <div className="text-sm leading-[140%] text-[rgba(0,0,0,0.32)]">
                •
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BreadCrumb;
