import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../Pages/HomePage"));
const EditPosts = lazy(() => import("../Pages/EditPostPage"));
const AddPost = lazy(() => import("../Pages/AddPostPage")); // Assuming you have this component

export default function RouteFile() {
  return (
    <Routes>
      <Route
        path="/edit/post/:postId"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EditPosts />
          </Suspense>
        }
      />
      <Route
        path="/add/post"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AddPost />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
    </Routes>
  );
}
