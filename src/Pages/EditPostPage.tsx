import { useState, useEffect } from "react";
import { DummyData } from "../Components/DummyData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../Slices/PostSlice";

const EditPostPage = () => {
  const { postId } = useParams();
  const postToEdit = DummyData.find((post) => post.ID.toString() === postId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    if (postToEdit) {
      return {
        ID: postToEdit.ID,
        Title: postToEdit.Title,
        Content: postToEdit.Content.map((content) => content.text).join("\n"),
        Author: postToEdit.Author,
        Date: postToEdit.Date,
      };
    }
    return { ID: "", Title: "", Content: "", Author: "", Date: 1 };
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        ID: postToEdit.ID,
        Title: postToEdit.Title,
        Content: postToEdit.Content.map((content) => content.text).join("\n"),
        Author: postToEdit.Author,
        Date: postToEdit.Date,
      });
    }
  }, [postToEdit]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      editPost({
        id: formData.ID,
        title: formData.Title,
        content: formData.Content,
        author: formData.Author,
        date: formData.Date,
      })
    );
    navigate("/");
  };

  return (
    <div className="bg-primary">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <label>ID</label>
          <input name="ID" value={formData.ID} onChange={handleChange} />
        </div>
        <div>
          <label>Title</label>
          <input name="Title" value={formData.Title} onChange={handleChange} />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="Content"
            value={formData.Content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            name="Author"
            value={formData.Author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            name="Date"
            type="date"
            value={new Date(formData.Date).toISOString().substring(0, 10)}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPostPage;
