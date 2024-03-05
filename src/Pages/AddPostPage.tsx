import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../Slices/PostSlice";

const AddPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Title: "",
    Content: [{ section: "", text: "" }],
    Author: "",
    Date: new Date().toISOString().substring(0, 10),
  });

  const handleChange: any = (e: any, index = null) => {
    const { name, value } = e.target;
    if (name === "section" || name === "text") {
      const updatedContent = formData.Content.map((content, idx) =>
        index === idx ? { ...content, [name]: value } : content
      );
      setFormData((prevState) => ({
        ...prevState,
        Content: updatedContent,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addContentField = () => {
    setFormData((prevState) => ({
      ...prevState,
      Content: [...prevState.Content, { section: "", text: "" }],
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      addPost({
        ...formData,
        ID: new Date().getTime(),
      })
    );
    navigate("/");
  };

  return (
    <div className="add-post-page max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {formData.Content.map((content, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <input
              name="section"
              value={content.section}
              onChange={(e) => handleChange(e, index)}
              required
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <textarea
              name="text"
              value={content.text}
              onChange={(e) => handleChange(e, index)}
              required
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}

        <div>
          <label htmlFor="Author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="Date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            name="Date"
            type="date"
            value={formData.Date}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="button" onClick={addContentField} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            Add Another Content Section
          </button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
