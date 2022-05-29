import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function BookmarkPage() {
    const { user, encodedToken } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(async () => {
        if (user !== null) {
            const res = await axios.get("/api/users/bookmark/", {
                headers: {
                    authorization: encodedToken
                }
            });
            setPosts(res.data.bookmarks);
        }
        else {
            alert("Sign in")
            navigate("/signup");
        }
    }, [user]);
    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <h2> Your bookmarks </h2>
                {
                    posts.length === 0 ? <div><h3>No posts to show here! </h3></div> :
                        <div>
                            {
                                posts.map((post) => {
                                    return <Post post={post} key={post._id} />
                                })
                            }
                        </div>
                }
            </div>
            <FollowThem />
        </div>
    )
}