import React, { useState, useEffect } from 'react';
import '../../styles.css';
import './homepage.css';
import Sidebar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import CreatePost from '../../components/create-post/create-post';
import FollowThem from '../../components/follow-them/follow-them';
import { useAuth } from '../../context/authContext';
import { getDocs } from '@firebase/firestore';
import { postsRef, usersRef } from '../../firebase';

export default function Homepage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let posts = [];
        res.forEach((doc) => {
            console.log('following: ', user.following);
            if (user.following.includes(doc.data().uid)) {
                console.log(doc.data().uid);
                posts.push({ ...doc.data(), id: doc.id });
            }

        });
        setPosts(posts);
    }

    const fetchUsers = async () => {
        const res = await getDocs(usersRef);
        let allUsers = [];
        res.forEach((doc) => {
            allUsers.push({ ...doc.data(), id: doc.id });
        })
        setUsers(allUsers);
    }

    useEffect(async () => {
        fetchPosts();
        fetchUsers();
    }, [user]);

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <CreatePost />
                <h3> Latest posts</h3>
                {
                    posts.map((post) => {
                        return <Post post={post} key={post.id} />
                    })
                }
            </div>
            <div className="follow-them-grid">
                {
                    users.map((user) => {
                        return <FollowThem userObj={user} key={user.id} />
                    })
                }
            </div>        </div>
    )
}