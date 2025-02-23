import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cross } from "../assets";
import { setAlert, setBlogs } from "../store/ui";


function DeleteBlogPopup({ setDeletePopup }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const blogs = useSelector((state) => state.blogs)

    const deleteRaising = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);

            console.log(res.data)

            navigate('/blogs')

            dispatch(setAlert({ message: 'Raising deleted successfully', type: "error" }));
            dispatch(setBlogs(blogs.filter(item => item._id !== id)))


        } catch (e) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
            console.log(e.response.data)
        }
    }

    return (
        <div className="popup-animation max-w-[666px] w-[90%] h-[399px] p-3 bg-white flex-col justify-start items-end gap-[77px] inline-flex">
            <div onClick={() => setDeletePopup(false)} className="w-6 h-6 relative">
                <img src={cross} alt="Cancel" />
            </div>
            <div className="self-stretch h-[174px] py-[17px] flex-col justify-start items-center gap-11 flex">
                <div className="self-stretch h-[60px] flex-col justify-start items-center gap-3 flex">
                    <div className="self-stretch opacity-90 text-center text-[#112230] text-xl font-bold font-inter leading-7">Are you sure you want to delete this blog?</div>
                    <div className="self-stretch text-center text-[#6d6d6d] text-sm font-normal font-roboto leading-tight">All your data according this blog will be deleted</div>
                </div>
                <div className="self-stretch justify-center items-start gap-3 inline-flex">
                    <button onClick={deleteRaising} className="h-9 px-2 cursor-pointer py-1.5 bg-[#e5f8f4]/70 rounded-[36px] border-2 border-[#288d7c] justify-center items-center gap-1 flex">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-[#288d7c] text-sm font-medium font-popins leading-normal">Delete</div>
                        </div>
                    </button>
                    <div onClick={() => setDeletePopup(false)} className="h-9 px-2 py-1.5 bg-gradient-to-b from-[#2dd6b4] to-[#21806f] rounded-[36px] justify-center items-center gap-1 cursor-pointer flex">
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-white text-sm font-medium font-popins leading-normal">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DeleteBlogPopup;