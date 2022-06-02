import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
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
    const [loggedUser, setLoggedUser] = useState();
    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let posts = [];
        res.forEach((doc) => {
            posts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(posts);
    }

    const fetchUser = async () => {
        const userID = localStorage.getItem("uid").replace(/^"(.*)"$/, '$1');
        const res = await getDocs(usersRef, `/users/${userID}`);
        res.docs.forEach(u => {
            if (JSON.stringify(u.data().uid) === localStorage.getItem("uid")) {
                setLoggedUser(u.data());
                console.log("Current user: ", loggedUser);
            }
        })
    }

    useEffect(async () => {
        fetchPosts();
        // fetchUser();
    }, [user]);

    const handleAddPost = async () => {
        try {
            const res = await addDoc(postsRef, {
                title: "A test sample post",
                content: "Some content for sample post.",
                fullName: loggedUser.fullName,
                username: loggedUser.username,
                uid: localStorage.getItem("uid")
            });
            fetchPosts();
        } catch (e) { console.log(e) }
    }

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
                <span onClick={handleAddPost}> <button> Add a test post </button> </span>

            </div>
            <FollowThem />
        </div>
    )
}