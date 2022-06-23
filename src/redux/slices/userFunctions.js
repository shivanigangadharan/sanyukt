import { getDocs, updateDoc, arrayUnion, arrayRemove, doc } from "@firebase/firestore";
import { usersRef, db } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = async (uid) => {
    const res = await getDocs(usersRef);
    var u;
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            u = { ...doc.data(), id: doc.id };
        }
    });
    return u;
};

export const setUserInLocalStorage = async (uid) => {
    const res = await getDocs(usersRef);
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            localStorage.setItem("user", JSON.stringify({ ...doc.data(), id: doc.id }))
        }
    });
}

export const addToFollowing = createAsyncThunk(
    "user/addToFollowing",
    async (arg) => {
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
    }
)

export const addToFollowers = createAsyncThunk(
    "user/addToFollowers",
    async (arg) => {
        try {
            console.log("Adding to following...")
            const userRef = doc(db, `users/${arg.id}`);
            const res = await updateDoc(userRef, {
                followers: arrayUnion(arg.userUID)
            })
        } catch (e) {
            console.log(e)
        }
    }
)


export const removeFromFollowing = createAsyncThunk(
    "user/removeFromFollowing",
    async (arg) => {
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
    }
)
export const removeFromFollowers = createAsyncThunk(
    "user/removeFromFollowers",
    async (arg) => {
        try {
            const userRef = doc(db, `users/${arg.id}`);
            const res = await updateDoc(userRef, {
                followers: arrayRemove(arg.userUID)
            });
        } catch (e) {
            console.log(e)
        }
    }
)
