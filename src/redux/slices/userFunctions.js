import { getDocs, updateDoc, arrayUnion, arrayRemove, doc, Timestamp, addDoc } from "@firebase/firestore";
import { usersRef, db, postsRef } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const getUser = async (uid) => {
    const res = await getDocs(usersRef);
    let user;
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            user = { ...doc.data(), id: doc.id };
        }
    });
    return user;
};

export const setUserInLocalStorage = async (uid) => {
    const res = await getDocs(usersRef);
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            localStorage.setItem("user", JSON.stringify({ ...doc.data(), id: doc.id }))
        }
    });
}

export const addToFollowing = createAsyncThunk("user/addToFollowing", async (arg) => {
    try {
        const userRef = doc(db, `users/${arg.userID}`);
        const res = await updateDoc(userRef, {
            following: arrayUnion(arg.uid)
        })
        const localUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({ ...localUser, following: [...localUser.following, arg.uid] }));
        return arg.uid;
    } catch (e) {
        console.log(e)
    }
})

export const addToFollowers = createAsyncThunk("user/addToFollowers", async (arg) => {
    try {
        const userRef = doc(db, `users/${arg.id}`);
        const res = await updateDoc(userRef, {
            followers: arrayUnion(arg.userUID)
        })
    } catch (e) {
        console.log(e)
    }
})

export const removeFromFollowing = createAsyncThunk("user/removeFromFollowing", async (arg) => {
    try {
        const userRef = doc(db, `users/${arg.userID}`);
        const res = await updateDoc(userRef, {
            following: arrayRemove(arg.uid)
        });
        const localUser = JSON.parse(localStorage.getItem("user"));
        const filteredFollowing = localUser.following.filter((userID) => userID !== arg.uid);
        localStorage.setItem("user", JSON.stringify({ ...localUser, following: filteredFollowing }));
        return filteredFollowing;
    } catch (e) {
        console.log(e)
    }
})

export const removeFromFollowers = createAsyncThunk("user/removeFromFollowers", async (arg) => {
    try {
        const userRef = doc(db, `users/${arg.id}`);
        const res = await updateDoc(userRef, {
            followers: arrayRemove(arg.userUID)
        });
    } catch (e) {
        console.log(e)
    }
})

export const postProfileData = createAsyncThunk("user/postProfileData", async (arg) => {
    try {
        const userRef = doc(db, `users/${arg.userID}`);
        const res = await updateDoc(userRef, {
            fullName: arg.fullName, username: arg.username, bio: arg.bio, portfolioURL: arg.portfolioURL, profilepic: arg.profilepic
        })
        const localUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify(
            {
                ...localUser, fullName: arg.fullName, username: arg.username, bio: arg.bio, portfolioURL: arg.portfolioURL, profilepic: arg.profilepic
            }
        ));
        return {
            ...localUser, fullName: arg.fullName, username: arg.username, bio: arg.bio, portfolioURL: arg.portfolioURL, profilepic: arg.profilepic
        }

    } catch (e) { console.log(e) }
})

export const sendPostContent = createAsyncThunk("user/sendPostContent", async (arg) => {

    try {
        const res = await addDoc(postsRef, {
            content: arg.text,
            fullName: arg.fullName,
            username: arg.username,
            uid: arg.uid,
            imgURL: arg.file,
            likes: 0,
            profilepic: arg.profilepic,
            createdAt: new Timestamp(new Date().getSeconds(), 0)
        });
    } catch (e) { console.log(e) }
})