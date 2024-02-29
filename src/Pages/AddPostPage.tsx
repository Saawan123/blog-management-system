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
    <div className="add-post-page">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <input
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        {formData.Content.map((content, index) => (
          <div key={index}>
            <label>Section</label>
            <input
              name="section"
              value={content.section}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <label>Text</label>
            <textarea
              name="text"
              value={content.text}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </div>
        ))}

        <div>
          <label htmlFor="Author">Author</label>
          <input
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Date">Date</label>
          <input
            name="Date"
            type="date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={addContentField}>
          Add Another Content Section
        </button>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostPage;
