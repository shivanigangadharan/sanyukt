import React, { useEffect } from 'react';
import '../../styles.css';
import avatar from '../../assets/defaultImg.png';
import './follow-them.css';
import { useAuth } from '../../context/authContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from '@firebase/firestore';
import { db } from '../../firebase';

export default function FollowThem({ userObj }) {
    const { fullName, username, following, uid, id, followers } = userObj;
    const { user, setUser } = useAuth();

    const addToFollowing = async () => {
        try {
            const userRef = doc(db, `users/${user.id}`);
            const res = await updateDoc(userRef, {
                following: arrayUnion(uid)
            })
            setUser({ ...user, following: [...user.following, uid] });
            localStorage.setItem("user", JSON.stringify({ ...user, following: [...user.following, uid] }));
        } catch (e) {
            console.log(e)
        }
    }

    const addToFollowers = async () => {
        try {
            const userRef = doc(db, `users/${id}`);
            const res = await updateDoc(userRef, {
                followers: arrayUnion(user.uid)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const removeFromFollowing = async () => {
        try {
            const userRef = doc(db, `users/${user.id}`);
            const res = await updateDoc(userRef, {
                following: arrayRemove(uid)
            });
            const filteredFollowing = user.following.filter((userID) => userID !== uid);
            setUser({ ...user, following: filteredFollowing });
            localStorage.setItem("user", JSON.stringify({ ...user, following: filteredFollowing }))
        } catch (e) {
            console.log(e)
        }
    }

    const removeFromFollowers = async () => {
        try {
            const userRef = doc(db, `users/${id}`);
            const res = await updateDoc(userRef, {
                followers: arrayRemove(user.uid)
            });
        } catch (e) {
            console.log(e)
        }
    }

    const handleFollowClick = () => {
        if (user.following.includes(uid)) {
            removeFromFollowers();
            removeFromFollowing();
        } else {
            addToFollowers();
            addToFollowing();
        }
    }

    return (
        <div className="follow-them-container">
            <div className="follow-them-title">
                <span><b> Who to follow</b> </span>
                <span className="red-text"> Show more </span>
            </div>
            <div className="user-avatar-container">
                <div className="user-avatar-content">
                    <img className="avatar" src={avatar} alt="avatar" />
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