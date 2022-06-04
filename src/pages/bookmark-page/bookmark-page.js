import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { db, postsRef } from '../../firebase';
import { query, collection, where, getDocs } from '@firebase/firestore';

export default function BookmarkPage() {
    const { user, encodedToken } = useAuth();
    const [postIDs, setPostIDs] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        if (localStorage.getItem("uid") !== null) {
            try {
                let postsArr = [];
                const res = await getDocs(postsRef);
                res.docs.forEach((e) => {
                    postsArr.push({ ...e.data(), id: e.id });
                })
                setPosts(postsArr);
            } catch (e) { console.log(e) }
        }
        else {
            alert("Sign in")
            navigate("/signup");
        }
    }, [localStorage.getItem("uid")]);
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
                                    if (user.bookmarks.includes(post.id)) {
                                        return <div key={post.id}> <Post post={post} /> </div>
                                    }
                                })
                            }
                        </div>
                }
            </div>
            <FollowThem />
        </div>
    )
}