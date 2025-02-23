import React, { useState } from 'react';
import { DashNav, SideNav } from '../components'
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { defImg, edit, trash } from '../assets';
import { useNavigate } from 'react-router-dom';
import { setAlert, setBlogs } from '../store/ui';

const BlogAdd = () => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ img: '', title: '', heading: '', content: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!formData.img) {
      dispatch(setAlert({ message: 'No Thumbnail', type: 'warning' }));
      setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200);
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("file", formData.img);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const thumbnailResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, data);
      
      const { img, ...restFormData } = formData;
      
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/submit`, {
        ...restFormData,
        img: thumbnailResponse.data.secure_url,
        content: value
      });
      dispatch(setAlert({ message: res.data.message, type: 'success' }));
      dispatch(setBlogs([...blogs, res.data.blog]));
      navigate("/blogs");
      setFormData({ img: '', title: '', heading: '', content: '' });
    } catch (e) {
      dispatch(setAlert({ message: e.response.data.error, type: 'warning' }));
      console.log(e);
    } finally {
      setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200);
      setIsSubmitting(false);
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
    (document.getElementById("img")).files = null;
    setFormData((p) => ({ ...p, img: null }));
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
    <div className="h-screen w-full overflow-hidden relative flex bg-gray-100">
      <SideNav />
      <div className="flex h-[100vh] w-[100%] flex-col">
        <DashNav />
        <div className="overflow-auto w-[100%] flex flex-col gap-5 p-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8">Add New Blog Post</h1>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Enter heading"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Add a cover photo</h2>
              <p className="text-sm text-gray-600 mb-4">Use a clear and bright photo to help people connect to your blog instantly.</p>
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
                  className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition duration-300"
                >
                  {!formData.img ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={defImg} alt="Default Image Icon" className="w-16 h-16 mb-4" />
                      <p className="text-gray-500">Drag or upload your photo here</p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(formData.img)}
                      className="w-full h-full object-contain rounded-lg"
                      alt="Preview Image"
                    />
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

            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdd;
