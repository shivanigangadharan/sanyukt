import React, { useEffect, useState } from 'react';
import '../../styles.css';
import './sidebar.css';
import avatar from '../../assets/defaultImg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function Sidebar() {
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setLoggedUser(user);
        }
    }, [user])
    return (
        <div className="sidebar-container">
            <div className="menu-options">
                <Link to="/homepage"><span><i className="fa-solid fa-house"></i> Home</span></Link>
                <Link to="/explore"><span><i className="fa-solid fa-rocket"></i> Explore</span></Link>
                <Link to="/bookmarks"><span><i className="fa-solid fa-bookmark"></i> Bookmarks</span></Link>
                <Link to="/notifications"><span><i className="fa-solid fa-bell"></i> Notifications </span></Link>
                <Link to="/profile"><span><i className="fa-solid fa-circle-user"></i> Profile </span></Link>
                <button className="btn create-post-btn"> Create new post </button>
            </div>
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    <img className="avatar" src={avatar} />

                    {
                        loggedUser === null ? <div> </div> : <div>
                            {loggedUser.firstName} {loggedUser.lastName} <br />
                            <span className="grey-text"> @{loggedUser.username}</span>
                        </div>
                    }

                </div>
                <div>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
    )
}