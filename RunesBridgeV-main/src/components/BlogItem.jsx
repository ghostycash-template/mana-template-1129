import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { defImg, edit, trash } from "../assets";
import { setAlert } from "../store/ui";
import { Editor } from '@tinymce/tinymce-react';

function BlogItem({ setDeletePopup }) {
    const [formData, setFormData] = useState({ img: '', title: '', heading: '', content: '' });
    const [value, setValue] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
            setFormData(res.data.blog);
            setValue(res.data.blog.content)
        } catch (e) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
        }
    };

    useEffect(() => {
        fetchBlog();
        window.scrollTo(0, 0);
    }, []);

    const updateBlog = async () => {
        if (!formData.img) {
            console.error('No img');
            return;
        }

        const data = new FormData();
        try {
            if (typeof formData.img !== 'string') {
                data.append("file", formData.img);
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
                data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

                const thumbnailResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, data);
                const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
                    ...formData,
                    img: thumbnailResponse.data.secure_url,
                    content: value
                });
                setFormData(res.data.blog);
            } else {
                const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, { ...formData, content: value });
            }
            dispatch(setAlert({ message: 'Blog updated successfully', type: "success" }));
        } catch (e) {
            dispatch(setAlert({ message: e.response.data.message, type: "error" }));
            console.log(e.response.data);
        } finally {
            setTimeout(() => dispatch(setAlert({ message: '', type: "error" })), 1200);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target

        if (type === 'file' && files) {
            setFormData((p) => ({ ...p, [name]: files[0] }));
        } else {
            setFormData((p) => ({ ...p, [name]: value }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        (document.getElementById("img")).files = dataTransfer.files;
    };

    const clearThumbnail = () => {
        (document.getElementById("img")).files = null
        setFormData((p) => ({ ...p, img: null }))
    }

    const handleEditorChange = (content) => {
        setValue(content);
    };

    const cloudinaryUpload = (blobInfo, progress) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob());
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    progress(Math.round(percentComplete));
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.secure_url);
                } else {
                    reject('Image upload failed');
                }
            };

            xhr.onerror = () => reject('Image upload failed');
            xhr.send(formData);
        });
    };

    return (
            <div className="container mx-auto py-8">
                <div className="mb-6">
                    <Link to="/blogs" className="inline-flex items-center px-4 py-2 bg-white rounded-full text-green-600 hover:bg-green-50 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
                        <div className="relative">
                            <input
                                type="file"
                                className="hidden"
                                id="img"
                                accept="image/*"
                                name="img"
                                onChange={handleChange}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            />
                            <label
                                htmlFor="img"
                                className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition duration-300"
                            >
                                {!formData.img ? (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <img src={defImg} alt="Default Image Icon" className="w-16 h-16 mb-4" />
                                        <p className="text-gray-500">Drag or upload your photo here</p>
                                    </div>
                                ) : (
                                    <img src={typeof formData.img === 'string' ? formData.img : URL.createObjectURL(formData.img)} className="rounded-lg bg-contain w-[100%] h-[100%]" alt="Preview Image" />
                                )}
                            </label>
                            {formData.img && (
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button onClick={clearThumbnail} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                                        <img src={edit} alt="Edit" className="w-5 h-5" />
                                    </button>
                                    <button onClick={clearThumbnail} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                                        <img src={trash} alt="Trash" className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title ?? ''}
                            onChange={handleChange}
                            placeholder="Enter Title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                        <input
                            type="text"
                            id="heading"
                            name="heading"
                            value={formData.heading ?? ''}
                            onChange={handleChange}
                            placeholder="Enter heading"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <Editor
                            apiKey={import.meta.env.VITE_TINY_API_KEY}
                            value={value}
                            init={{
                                height: 500,
                                menubar: true,
                                a11y_advanced_options: true,
                                plugins: [
                                    'advlist autolink lists link image charmap preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | help | image',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img {display:block; max-width: 100%; height: auto; }',
                                images_upload_handler: (blobInfo, progress) => cloudinaryUpload(blobInfo, progress),
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>

                    <div className="flex justify-end mb-8">
                        <button
                            onClick={updateBlog}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                        >
                            Save changes
                        </button>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-red-600">Delete Blog</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <p className="text-gray-600 mb-4 sm:mb-0">NOTE: All your data related to this blog will be permanently deleted.</p>
                            <button
                                onClick={() => setDeletePopup(true)}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default BlogItem;
