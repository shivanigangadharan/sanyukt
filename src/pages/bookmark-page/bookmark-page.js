import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';

export default function BookmarkPage() {
    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-posts">
                <h3> Your bookmarks </h3>
                <Post />
                <Post />
                <Post />
            </div>
            <FollowThem />
        </div>
    )
}