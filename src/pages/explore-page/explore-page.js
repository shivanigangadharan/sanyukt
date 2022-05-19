import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import './explore-page.css';

export default function ExplorePage() {
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
                <Post />
                <Post />
                <Post />
            </div>
            <FollowThem />
        </div>
    )
}