import { createSlice } from "@reduxjs/toolkit";
import { DummyData } from "../Components/DummyData";

export const PostSlice = createSlice({
  name: "posts",
  initialState: DummyData,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },

    editPost: (state, action) => {
        const { id, title, content, author, date } = action.payload;
        const existingPost = state.find(post => post.ID === id);
        if (existingPost) {
          existingPost.Title = title;
          existingPost.Content = content.split("\n").map((text:any, index:number) => ({ section: `Section ${index + 1}`, text }));
          existingPost.Author = author;
        }
  },

  deletePost: (state, action) => {
    return state.filter(post => post.ID !== action.payload);
  },
}
});

export const { addPost,editPost, deletePost } = PostSlice.actions;
export default PostSlice.reducer;
