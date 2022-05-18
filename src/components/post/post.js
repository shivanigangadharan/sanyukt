import React from 'react';
import './post.css';
import '../../styles.css';
import avatar from '../../assets/defaultImg.png';

export default function Post() {
    return (
        <div className="post-container">
            <img className="avatar" src={avatar} alt="user-avatar" />
            <div>
                <div className="post-title">
                    <b>Tanay Pratap</b>
                    <span style={{ 'color': 'grey' }}> @tanaypratap</span>
                    <span style={{ 'color': 'grey' }}>  &#9679; 1m </span>
                </div>
                <div>
                    Non programmers on my timeline. Attention. <br /><br />
                    After placing 100+ programmers in top Indian startups, I am thinking of coming up with a program for business roles as well.<br /><br />
                    Interested in helping me build this course? Join the telegram group (in next tweet)
                </div>
                <div className="post-icons">
                    <span> <i class="fa-regular fa-heart"></i> </span>
                    <span> <i class="fa-regular fa-comment"></i> </span>
                    <span> <i class="fa-regular fa-share-from-square"></i> </span>
                    <span> <i class="fa-regular fa-bookmark"></i> </span>
                </div>
            </div>
        </div>
    )
}