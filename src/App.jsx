import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/signin.authPage";
import SignUpPage from "./pages/auth/signup.authPage";
import { useSelector } from "react-redux";
import HomePage from "./pages/home";
import EditorPage from "./pages/editor";
import UserProfilePage from "./pages/user-profile-page";
import BlogPage from "./pages/blog-page";

function App() {
  // Hooks
  const auth = useSelector((state) => state.auth.sessionId);
  return (
    <Routes>
      <Route path="/" element={auth !== null ? <HomePage /> : <SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/user/:id" element={<UserProfilePage/>}/>
      <Route path="/blog/:id" element={<BlogPage/>}/>
    </Routes>
  );
}

export default App;
