import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import './profile-page.css';
import profilePic from '../../assets/defaultImg.png';
import { useAuth } from '../../context/authContext';
import { getDocs } from '@firebase/firestore';
import { usersRef, postsRef } from '../../firebase';

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [display, setDisplay] = useState("following");

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
        let allPosts = [];
        res.forEach((doc) => {
            allPosts.push({ ...doc.data(), id: doc.id });
        })
        setPosts(allPosts);
    }

    useEffect(async () => {
        fetchUsers();
        fetchPosts();
    }, [user]);

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <center>
                    <div className="profile-content">
                        <div><img alt="profile-pic" src={profilePic} className="profile-pic" /></div>
                        <span className="name"> {user.fullName} </span>
                        <span className="username"> @{user.username} </span>
                        <button className="edit-profile-btn"> Edit profile </button>
                        <span className="bio"> {user.bio} </span>
                        <a target="_blank" href={user.portfolioURL} className="bio red-text"> {user.portfolioURL} </a>
                    </div>

                    <div className="profile-numbers">
                        <div onClick={() => setDisplay("following")}>
                            <span><b> {user.following.length} </b></span>
                            <span> Following </span>
                        </div>
                        <div onClick={() => setDisplay("posts")}>
                            <span><b> {user.posts.length} </b></span>
                            <span> Posts </span>
                        </div>
                        <div onClick={() => setDisplay("followers")}>
                            <span><b> {user.followers.length} </b></span>
                            <span> Followers </span>
                        </div>
                    </div>
                </center>

                <div hidden={display === "following" ? false : true}>
                    <h2> Following </h2>
                    {
                        users.map((usr) => {
                            if (user.following.includes(usr.uid)) {
                                return <div className="follow-container" key={usr.id}>
                                    <img className="avatar" src={profilePic} alt="profilePic" />
                                    <div>
                                        <div className="follow-title">
                                            <h4> {usr.fullName} </h4>
                                            <span className="grey-text"> @{usr.username} </span>
                                        </div>
                                        {usr.bio}
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>

                <div hidden={display === "followers" ? false : true}>
                    <h2> Followers </h2>
                    {
                        users.map((usr) => {
                            if (user.followers.includes(usr.uid)) {
                                return <div className="follow-container" key={usr.id}>
                                    <img className="avatar" src={profilePic} alt="profilePic" />
                                    <div>
                                        <div className="follow-title">
                                            <h4> {usr.fullName} </h4>
                                            <span className="grey-text"> @{usr.username} </span>
                                        </div>
                                        {usr.bio}
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>

                <div hidden={display === "posts" ? false : true}>
                    <h2> Your posts </h2>
                    {
                        posts.map((post) => {
                            if (post.uid === user.uid) {
                                return <Post post={post} key={post.id} />
                            }
                        })
                    }
                </div>

            </div>

            <div className="follow-them-grid">
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