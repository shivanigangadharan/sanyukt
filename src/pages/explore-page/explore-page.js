import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import './explore-page.css';
import { useAuth } from '../../context/authContext';
import { postsRef, usersRef, db } from '../../firebase';
import { getDocs, addDoc, query, collection, where } from '@firebase/firestore';

export default function ExplorePage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let posts = [];
        res.forEach((doc) => {
            posts.push({ ...doc.data(), id: doc.id });
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
                <h3> Explore </h3>
                <div className="explore-categories">
                    <button> For you </button>
                    <button> Trending </button>
                    <button> Technology </button>
                    <button> Self care </button>
                    <button> World </button>
                </div>
                {
                    posts.map((post) => {
                        return <Post post={post} key={post.id} />
                    })
                }

            </div>
            <div className="follow-them-grid">
                <div className="follow-them-title">
                    <span><b> Who to follow</b> </span>
                    <span className="red-text"> Show more </span>
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