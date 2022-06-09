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

export default function Homepage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [postContent, setPostContent] = useState(null);
    const [file, setFile] = useState(null);

    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let posts = [];
        res.forEach((doc) => {
            if (user.following.includes(doc.data().uid) || doc.data().uid === user.uid) {
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

    const postImage = async () => {
        if (postContent === null && file === null) {
            alert("Please either add content or an image to post.");
        } else if (file === null) {
            sendPostContent("");
        } else {
            try {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "madhunter");
                data.append("cloud_name", "dqpanoobq");
                const res = await axios.post("https://api.cloudinary.com/v1_1/dqpanoobq/image/upload", data);
                sendPostContent(res.data.url);
            } catch (e) { console.log(e) }
        }
    }

    const sendPostContent = async (url) => {
        try {
            const res = await addDoc(postsRef, {
                content: postContent,
                fullName: user.fullName,
                username: user.username,
                uid: JSON.parse(localStorage.getItem("uid")),
                imgURL: url,
                likes: 0,
                profilepic: user.profilepic,
                createdAt: new Timestamp(new Date().getSeconds(), 0)
            });
            setPostContent("");
            setFile();
            fetchPosts();

        } catch (e) { console.log(e) }
    }

    const handleAddPost = () => {
        if (postContent === null && url === null) {
            alert("Please add some content to post.");
        } else {
            postImage();
        }

    }

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <div className="create-post-container">
                    <img alt="profile-pic" src={user.profilepic} className="avatar" />
                    <div className="create-post-content">
                        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Write something fun here, to post..." className="create-post-input"></textarea>
                        <img src={file && URL.createObjectURL(file)} className="img-preview" />
                        <div className="create-post-section">
                            <div className="create-post-icons">
                                <label htmlFor="post-img">
                                    <span><i className="fa-regular fa-image"></i></span>
                                </label>
                                <input id="post-img" type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </div>
                            <button className="btn post-btn" onClick={handleAddPost}>Post </button>
                        </div>
                    </div>
                </div>
                <h3> Posts for you</h3>
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