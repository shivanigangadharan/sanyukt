import React from 'react';
import '../../styles.css';
import avatar from '../../assets/defaultImg.png';
import './follow-them.css';

export default function FollowThem() {
    return (
        <div className="follow-them-container">
            <div className="follow-them-title">
                <span><b> Who to follow</b> </span>
                <span className="red-text"> Show more </span>
            </div>
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    <img className="avatar" src={avatar} />
                    <div>
                        Shivani Gangadharan <br />
                        <span className="grey-text"> @gshivani </span>
                    </div>
                </div>
                <div className="red-text">
                    Follow +
            </div>
            </div>
        </div>
    )
}