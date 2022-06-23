import React, { useEffect, useState } from 'react';
import 'styles.css';
import './sidebar.css';
import avatar from '../../assets/defaultImg.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from 'redux/slices/userSlice';

export default function Sidebar() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogout());
        navigate("/")
    }

    return (
        <div className="sidebar-container">
            <div className="menu-options">
                <Link to="/homepage"><span><i className="fa-solid fa-house"></i> Home</span></Link>
                <Link to="/explore"><span><i className="fa-solid fa-rocket"></i> Explore</span></Link>
                <Link to="/bookmarks"><span><i className="fa-solid fa-bookmark"></i> Bookmarks</span></Link>
                {/* <Link to="/notifications"><span><i className="fa-solid fa-bell"></i> Notifications </span></Link> */}
                <Link to="/profile"><span><i className="fa-solid fa-circle-user"></i> Profile </span></Link>
                <span onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout </span>
                <Link to="/homepage"> <button className="btn create-post-btn"> Create new post </button></Link>
            </div>
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    {user !== null ?
                        <img alt="profile-pic" src={user.profilepic} className="avatar" />
                        : <div></div>}
                    {
                        user === null ? <div> </div> : <div>
                            {user.fullName} <br />
                            <span className="grey-text"> @{user.username}</span>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}