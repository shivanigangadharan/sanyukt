import React from 'react';
import '../../styles.css';
import './sidebar.css';
import avatar from '../../assets/defaultImg.png';

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="menu-options">
                <span><i className="fa-solid fa-house"></i> Home</span>
                <span><i className="fa-solid fa-rocket"></i> Explore</span>
                <span><i className="fa-solid fa-bookmark"></i> Bookmarks</span>
                <span><i className="fa-solid fa-bell"></i> Notifications </span>
                <span><i className="fa-solid fa-circle-user"></i> Profile </span>
                <button className="btn create-post-btn"> Create new post </button>
            </div>
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    <img className="avatar" src={avatar} />
                    <div>
                        Tanay Pratap <br />
                        <span className="grey-text"> @tanaypratap</span>
                    </div>
                </div>
                <div>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
    )
}