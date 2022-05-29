import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import './explore-page.css';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

export default function ExplorePage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const res = await axios.get("/api/posts")
        setPosts(res.data.posts);
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
                        return <Post post={post} key={post._id} />
                    })
                }
            </div>
            <FollowThem />
        </div>
    )
}