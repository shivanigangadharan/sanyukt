import React, { useEffect, useState } from 'react';
import './post.css';
import '../../styles.css';
import avatar from '../../assets/defaultImg.png';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useStateContext } from '../../context/stateContext';
import { usersRef, db } from '../../firebase';
import { updateDoc, arrayUnion, collection, doc, arrayRemove } from '@firebase/firestore';
import { useNavigate } from 'react-router';

export default function Post({ post }) {
    const { user, setUser, encodedToken } = useAuth();
    const { dispatch } = useStateContext();
    const [comments, setComments] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);
    const { content, title, likes, id, email, username, fullName } = post;
    const navigate = useNavigate();

    const addBookmark = async () => {
        try {
            const userRef = doc(db, `users/${user.id}`);
            const res = await updateDoc(userRef, {
                bookmarks: arrayUnion(id)
            })
            setUser({ ...user, bookmarks: [...user.bookmarks, id] });
            localStorage.setItem("user", JSON.stringify({ ...user, bookmarks: [...user.bookmarks, id] }));
        }
        catch (e) {
            console.log(e);
        }
    }

    const removeBookmark = async () => {
        try {
            const userRef = doc(db, `users/${user.id}`);
            const res = await updateDoc(userRef, {
                bookmarks: arrayRemove(id)
            });
            const filteredBookmarks = user.bookmarks.filter((pid) => pid !== id);
            setUser({ ...user, bookmarks: filteredBookmarks });
            localStorage.setItem("user", JSON.stringify({ ...user, bookmarks: filteredBookmarks }));

        } catch (e) {
            alert("Unable to remove this bookmark.");
            console.log(e);
        }
    }
    const handleBookmarkClick = async () => {
        if (user) {
            if (user.bookmarks.some(postID => postID === id)) {
                removeBookmark();
            } else {
                addBookmark();
            }
        }
        else {
            alert("Please sign in to add bookmark.");
            navigate("/login");
        }
    }
    return (
        <div className="post-container">
            <img className="avatar" src={avatar} alt="user-avatar" />
            <div className="post-content">
                <div className="post-title">
                    <b>{fullName}</b>
                    <span style={{ 'color': 'grey' }}> @{username}</span>
                </div>
                <div>
                    {content}
                </div>
                <div className="post-icons">
                    <span> <i className="fa-regular fa-heart"></i> <span style={{ 'fontSize': '1rem' }}> {likes} </span></span>
                    <span> <i className="fa-regular fa-comment"></i> </span>
                    <span> <i className="fa-regular fa-share-from-square"></i> </span>
                    {user && user.bookmarks.includes(id) ?
                        <div>
                            <span onClick={handleBookmarkClick}> <i className="fa-solid fa-bookmark"></i> </span>
                        </div> :
                        <div>
                            <span onClick={handleBookmarkClick}> <i className="fa-regular fa-bookmark"></i> </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}