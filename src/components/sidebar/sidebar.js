import React from 'react';
import '../../styles.css';
import './sidebar.css';
import defaultImg from '../../assets/defaultImg.png';

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="menu-options">
                <div><i className="fa-solid fa-house"></i> Home</div>
                <div><i className="fa-solid fa-rocket"></i> Explore</div>
                <div><i className="fa-solid fa-bookmark"></i> Bookmarks</div>
                <div><i className="fa-solid fa-bell"></i> Notifications </div>
                <div><i className="fa-solid fa-circle-user"></i> Profile </div>
                <button className="btn create-post"> Create new post </button>
            </div>
            <div className="user-avatar-div">
                <img className="avatar" src={defaultImg} />
                <div>
                    Tanay Pratap <br />
                    @tanaypratap
                    </div>
            </div>
        </div>
    )
}