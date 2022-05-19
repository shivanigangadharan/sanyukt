import React from 'react';
import './create-post.css';
import avatar from '../../assets/defaultImg.png';

export default function CreatePost() {
    return (
        <div className="create-post-container">
            <img className="avatar" src={avatar} alt="user-avatar" />
            <div className="create-post-content">
                <textarea placeholder="Write something fun here, to post..." className="create-post-input"></textarea>
                <div className="create-post-section">
                    <div className="create-post-icons">
                        <span><i className="fa-regular fa-image"></i></span>
                        <span><i className="fa-solid fa-upload"></i></span>
                        <span><i className="fa-solid fa-face-grin-beam"></i></span>
                    </div>
                    <button className="btn post-btn">Post </button>
                </div>
            </div>
        </div>
    )
}