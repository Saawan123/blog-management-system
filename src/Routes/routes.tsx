import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../Pages/HomePage"));
const AddPost = lazy(() => import("../Pages/AddPostPage")); // Assuming you have this component

export default function RouteFile() {
  return (
    <Routes>
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
