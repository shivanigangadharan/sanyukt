import React from 'react';
import '../../styles.css';
import './sidebar.css';
import avatar from '../../assets/defaultImg.png';

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="menu-options">
                <div><i className="fa-solid fa-house"></i> Home</div>
                <div><i className="fa-solid fa-rocket"></i> Explore</div>
                <div><i className="fa-solid fa-bookmark"></i> Bookmarks</div>
                <div><i className="fa-solid fa-bell"></i> Notifications </div>
                <div><i className="fa-solid fa-circle-user"></i> Profile </div>
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
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
    )
}