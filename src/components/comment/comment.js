import React, { useState } from 'react';
import './comment.css';
import avatar from 'assets/defaultImg.png';

export default function Comment({ details }) {
    const { comment, fullName, profilepic } = details;
    return (
        <div className="comment-container">
            <img alt="profile-pic" src={profilepic} className="avatar" />
            <div className="comment-content">
                <b>{fullName}</b>
                {comment}
            </div>
        </div>
    )
}