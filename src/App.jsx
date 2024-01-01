import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/signin.authPage";
import SignUpPage from "./pages/auth/signup.authPage";
import { useSelector } from "react-redux";
import HomePage from "./pages/home";
import EditorPage from "./pages/editor";
import UserProfilePage from "./pages/user-profile-page";
import BlogPage from "./pages/blog-page";
import SideNav from "./layout/sideNav.layout";
import InputBlogCategory from "./components/input-blogs-category.component";
import ChangePasswordComponent from "./components/changePassword.component";

function App() {
  const [isUserActivityOpen, setIsUserActivityOpen] = useState(false);
  const userActivity = useSelector(
    (state) => state.userActivity.userData.recentActivities
  );
  useEffect(() => {
    if (userActivity.length === 0) {
      setIsUserActivityOpen(true)
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={isUserActivityOpen ? <InputBlogCategory setIsUserActivityOpen={setIsUserActivityOpen} /> : <HomePage/>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/user/:id" element={<UserProfilePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="settings" element={<SideNav />}>
        <Route path="edit-profile" element={<h1>Elemenbjzvxcvzxhjc zxchxzcvjhzcvjhxzvcjxhzcvhjvzxhcvjhjzxcjzchxvcxhzchxvchcxcvxzjhcvchvzxcvjcvzjxcvxcvt</h1>} />
        <Route path="change-password" element={<ChangePasswordComponent/>} />
      </Route>
    </Routes>
  );
}

export default App;
