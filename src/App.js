import "./App.css";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import BookmarkPage from "./pages/bookmark-page/bookmark-page";
import ExplorePage from "./pages/explore-page/explore-page";
import NotificationsPage from "./pages/notifications-page/notifications-page";
import ProfilePage from "./pages/profile-page/profile-page";
import PostPage from "./pages/post-page/post-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage/landingpage";
import Homepage from "./pages/homepage/homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Landingpage />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="bookmarks" element={<BookmarkPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
