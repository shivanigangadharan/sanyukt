import React, { useEffect, useState } from 'react';
import Sidebar from 'components/sidebar/sidebar';
import Post from 'components/post/post';
import FollowThem from 'components/follow-them/follow-them';
import 'styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { db, postsRef, usersRef } from 'firebase';
import { query, collection, where, getDocs } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import noData from 'assets/noData.png';

export default function BookmarkPage() {
    const user = useSelector((state) => state.user)
    const [postIDs, setPostIDs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    console.log("user - ", user)
    const fetchUsers = async () => {
        const res = await getDocs(usersRef);
        let allUsers = [];
        res.forEach((doc) => {
            allUsers.push({ ...doc.data(), id: doc.id });
        })
        setUsers(allUsers);
    }

    useEffect(async () => {
        if (localStorage.getItem("user") !== null) {
            try {
                let postsArr = [];
                const res = await getDocs(postsRef);
                res.docs.forEach((e) => {
                    postsArr.push({ ...e.data(), id: e.id });
                })
                setPosts(postsArr);
                fetchUsers();
            } catch (e) { console.log(e) }
        }
        else {
            alert("Sign in")
            navigate("/signup");
        }
    }, [localStorage.getItem("user")]);

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <h2> Your bookmarks </h2>
                {
                    user.bookmarks.length === 0 ?
                        <div className="noData">
                            <img src={noData} alt="No data" />
                        </div>
                        : <div>
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
            <div className="follow-them-grid">
                <div className="follow-them-title">
                    <span><b> Who to follow</b> </span>
                    {/* <span className="red-text"> Show more </span> */}
                </div>
                {
                    users.map((usr) => {
                        if (user.uid !== usr.uid) {
                            return <FollowThem userObj={usr} key={usr.id} />
                        }
                    })
                }
            </div>
        </div>
    )
}