import React, { useEffect } from 'react';
import 'styles.css';
import avatar from 'assets/defaultImg.png';
import './follow-them.css';
import { doc, updateDoc, arrayUnion, arrayRemove } from '@firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addToFollowing, addToFollowers, removeFromFollowers, removeFromFollowing } from 'redux/slices/userFunctions';

export default function FollowThem({ userObj }) {
    const { fullName, username, following, uid, id, followers, profilepic } = userObj;
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleFollowClick = () => {
        if (user.following.includes(uid)) {
            dispatch(removeFromFollowing({ userID: user.id, uid: uid }));
            dispatch(removeFromFollowers({ id: id, userUID: user.uid }));
        } else {
            dispatch(addToFollowers({ id: id, userUID: user.uid }));
            dispatch(addToFollowing({ userID: user.id, uid: uid }));
        }
    }

    return (
        <div className="follow-them-container">
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    <img alt="profile-pic" src={profilepic} className="avatar" />
                    <div>
                        {fullName} <br />
                        <span className="grey-text"> @{username} </span>
                    </div>
                </div>

                {user && user.following.includes(uid) ?
                    <div className="red-text followed-btn" onClick={handleFollowClick}>
                        Following
                </div>
                    :
                    <div className="red-text follow-btn" onClick={handleFollowClick}>
                        Follow
                </div>
                }
            </div>
        </div>
    )
}