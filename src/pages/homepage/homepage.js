import React from 'react';
import '../../styles.css';
import './homepage.css';
import Sidebar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import CreatePost from '../../components/create-post/create-post';
import FollowThem from '../../components/follow-them/follow-them';

export default function Homepage() {
    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-posts">
                <CreatePost />
                <h3> Latest posts</h3>
                <Post />
                <Post />
                <Post />
            </div>

            <FollowThem />

        </div>
    )
}