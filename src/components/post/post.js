import React, { useEffect, useState } from 'react';
import './post.css';
import '../../styles.css';
import avatar from '../../assets/defaultImg.png';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useStateContext } from '../../context/stateContext';

export default function Post({ post }) {
    const { user, setUser, encodedToken } = useAuth();
    const { dispatch } = useStateContext();
    const [comments, setComments] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);
    const { content, title, likes, id, email, username, fullName } = post;


    const addBookmark = async () => {
        try {
            const res = await axios.post(`/api/users/bookmark/${_id}`, {},
                {
                    headers: {
                        authorization: encodedToken
                    }
                });
            setUser({ ...user, bookmarks: res.data.bookmarks });
        }
        catch (e) {
            console.log(e);
        }
    }

    const removeBookmark = async () => {
        try {
            const res = await axios.post(`/api/users/remove-bookmark/${_id}`, {},
                {
                    headers: {
                        authorization: encodedToken
                    }
                });
            setUser({ ...user, bookmarks: res.data.bookmarks })
        } catch (e) {
            alert("Unable to remove this bookmark.");
            console.log(e);
        }
    }
    const handleBookmarkClick = async () => {

        if (user.bookmarks.some(p => p._id === post._id)) {
            removeBookmark();
        } else {
            addBookmark();
        }
    }
    return (
        <div className="post-container">
            <img className="avatar" src={avatar} alt="user-avatar" />
            <div className="post-content">
                <div className="post-title">
                    <b>{fullName}</b>
                    <span style={{ 'color': 'grey' }}> @{username}</span>
                    {/* <span style={{ 'color': 'grey' }}>  &#9679; 1m </span> */}
                </div>
                <div>
                    {content}
                </div>
                <div className="post-icons">
                    <span> <i className="fa-regular fa-heart"></i> <span style={{ 'fontSize': '1rem' }}> {likes} </span></span>
                    <span> <i className="fa-regular fa-comment"></i> </span>
                    <span> <i className="fa-regular fa-share-from-square"></i> </span>
                    <span onClick={handleBookmarkClick}> <i className="fa-regular fa-bookmark"></i> </span>
                </div>
            </div>
        </div>
    )
}