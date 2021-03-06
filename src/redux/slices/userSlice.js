import { addBookmark, removeBookmark, addLike, removeLike, addPost } from "./postFunctions";

import {
    getUser, setUserInLocalStorage, addToFollowing,
    addToFollowers, removeFromFollowers, removeFromFollowing, postProfileData
} from "./userFunctions";

import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { getDocs, addDoc, arrayRemove } from "@firebase/firestore";
import { usersRef } from "../../firebase";

//logged in user
const initialState = localStorage.getItem("user") === null ? {} : JSON.parse(localStorage.getItem("user"));

const auth = getAuth();


const addUserToDB = async (fullName, username, uid) => {
    try {
        const res = await addDoc(usersRef, {
            ...initialState, fullName: fullName, username: username, uid: uid,
            bookmarks: [], following: [], followers: [], posts: [], likes: [],
            bio: "Enter a short and suitable bio for yourself.",
            portfolioURL: "enteryourPortfolio@url.com",
            profilepic: "https://res.cloudinary.com/dqpanoobq/image/upload/v1654634630/Social%20Media/defaultImg_j01icd.png",
        });
        setUserInLocalStorage(uid);
    }
    catch (e) {
        console.log(e);
    }
}

export const userSignUp = createAsyncThunk(
    "user/signup",
    async (arg) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, arg.email, arg.password);
            addUserToDB(arg.fullName, arg.username, res.user.uid)
            const loggedUser = getUser(res.user.uid);
            return loggedUser;
        } catch (e) { console.log(e); throw (e); }
    }
)

export const userLogin = createAsyncThunk(
    "user/login",
    async (arg) => {
        try {
            const res = await signInWithEmailAndPassword(auth, arg.email, arg.password);
            setUserInLocalStorage(res.user.uid);
            const loggedUser = getUser(res.user.uid);
            return loggedUser;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
)

export const userLogout = createAsyncThunk("user/logout", async (arg) => {
    try {
        const res = await signOut(auth);
        localStorage.removeItem("user");
        return null;
    }
    catch (e) {
        console.log(e);
        return false;
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [userSignUp.rejected]: (state, action) => {
            console.log("Rejected: ", action.error.message);
        },
        [userSignUp.fulfilled]: (state, action) => {
            state.uid = action.payload.uid;
            state.fullName = action.payload.fullName;
            state.username = action.payload.username;
            state.posts = action.payload.posts;
            state.bookmarks = action.payload.bookmarks;
            state.likes = action.payload.likes;
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            state.bio = action.payload.bio;
            state.portfolioURL = action.payload.portfolioURL;
            state.uid = action.payload.uid;
            state.id = action.payload.id;
            state.profilepic = action.payload.profilepic;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.uid = action.payload.uid;
            state.fullName = action.payload.fullName;
            state.username = action.payload.username;
            state.posts = action.payload.posts;
            state.bookmarks = action.payload.bookmarks;
            state.likes = action.payload.likes;
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            state.bio = action.payload.bio;
            state.portfolioURL = action.payload.portfolioURL;
            state.uid = action.payload.uid;
            state.id = action.payload.id;
            state.profilepic = action.payload.profilepic;
        },
        [userLogout.fulfilled]: (state, action) => {
            state = null;
        },
        [addToFollowing.fulfilled]: (state, action) => {
            state.following = [...state.following, action.payload]
        },
        [removeFromFollowing.fulfilled]: (state, action) => {
            state.following = action.payload;
        },
        [addBookmark.fulfilled]: (state, action) => {
            state.bookmarks = [...state.bookmarks, action.payload]
        },
        [removeBookmark.fulfilled]: (state, action) => {
            state.bookmarks = action.payload;
        },
        [addLike.fulfilled]: (state, action) => {
            state.likes = [...state.likes, action.payload]
        },
        [removeLike.fulfilled]: (state, action) => {
            state.likes = action.payload;
        },
        [addPost.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        [postProfileData.fulfilled]: (state, action) => {
            state.fullName = action.payload.fullName;
            state.username = action.payload.username;
            state.bio = action.payload.bio;
            state.portfolioURL = action.payload.portfolioURL;
            state.profilepic = action.payload.profilepic;
        }
    }
});

export default userSlice.reducer;