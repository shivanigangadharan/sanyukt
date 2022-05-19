import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import CreatePost from '../../components/create-post/create-post';
import Post from '../../components/post/post';
import FollowThem from '../../components/follow-them/follow-them';
import '../../styles.css';
import './profile-page.css';
import profilePic from '../../assets/defaultImg.png';

export default function ProfilePage() {
    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">

                <div className="profile-content">
                    <div><img alt="profile-pic" src={profilePic} className="profile-pic" /></div>
                    <span className="name"> Shivani Gangadharan </span>
                    <span className="username"> @shivanigangadharan </span>
                    <button className="edit-profile-btn"> Edit profile </button>
                    <span className="bio"> Bio - a short description of you specifying your work, interests, hobbies, etc. </span>
                    <a target="_blank" href="https://neogrammershivani.netlify.app/" className="bio red-text"> https://neogrammershivani.netlify.app/</a>
                </div>
                <center>
                    <div className="profile-numbers">
                        <div>
                            <span><b> 80 </b></span>
                            <span> Following </span>
                        </div>
                        <div>
                            <span><b> 15 </b></span>
                            <span> Posts </span>
                        </div>
                        <div>
                            <span><b> 130 </b></span>
                            <span> Followers </span>
                        </div>
                    </div>
                </center>
                <h3> Your posts </h3>
                <Post />
                <Post />
                <Post />

            </div>
            <FollowThem />
        </div>
    )
}