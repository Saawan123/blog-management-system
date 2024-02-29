import { configureStore } from '@reduxjs/toolkit';
import PostReducer from "../Slices/PostSlice"

export const store = configureStore({
  reducer: {
    posts: PostReducer,
  },
});
