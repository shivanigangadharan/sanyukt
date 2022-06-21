import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import BookmarkPage from "./pages/bookmark-page/bookmark-page";
import ExplorePage from "./pages/explore-page/explore-page";
import NotificationsPage from "./pages/notifications-page/notifications-page";
import ProfilePage from "./pages/profile-page/profile-page";
import PostPage from "./pages/post-page/post-page";
import Landingpage from "./pages/Landingpage/landingpage";
import Homepage from "./pages/homepage/homepage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="/" element={<Landingpage />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="bookmarks" element={<BookmarkPage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="/post/:id" element={<PostPage />} />

            </Routes>

        </div>
    )
}