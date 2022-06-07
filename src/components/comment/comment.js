import React, { useState } from 'react';
import './comment.css';
import avatar from '../../assets/defaultImg.png';

export default function Comment({ details }) {
    const { comment, fullName } = details;
    return (
        <div className="comment-container">
            <img src={avatar} className="avatar" alt="avatar" />
            <div className="comment-content">
                <b>{fullName}</b>
                {comment}
            </div>
        </div>
    )
}