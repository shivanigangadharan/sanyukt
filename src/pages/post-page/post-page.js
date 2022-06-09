import React, { useState, useEffect } from 'react';
import '../../styles.css';
import Sidebar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import { useAuth } from '../../context/authContext';
import { getDocs, addDoc, Timestamp } from '@firebase/firestore';
import { postsRef, usersRef } from '../../firebase';
import avatar from '../../assets/defaultImg.png';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Homepage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const { id } = useParams();

    const fetchUsers = async () => {
        const res = await getDocs(usersRef);
        let allUsers = [];
        res.forEach((doc) => {
            allUsers.push({ ...doc.data(), id: doc.id });
        })
        setUsers(allUsers);
    }

    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let posts = [];
        res.forEach((doc) => {
            console.log("doc id: ", doc.id, "id: ", id)
            if (doc.id === id) {
                posts.push({ ...doc.data(), id: doc.id });
            }
        });
        setPosts(posts);
    }
    useEffect(() => {
        fetchPosts();
        fetchUsers();
    }, [user]);


    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
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