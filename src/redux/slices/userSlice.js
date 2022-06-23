import { addBookmark, removeBookmark, addLike, removeLike } from "./postFunctions";

import {
    getUser, setUserInLocalStorage, addToFollowing,
    addToFollowers, removeFromFollowers, removeFromFollowing
} from "./userFunctions";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { getDocs, addDoc, arrayRemove } from "@firebase/firestore";
import { usersRef } from "../../firebase";

//logged in user
const initialState = localStorage.getItem("user") === null ? {} : JSON.parse(localStorage.getItem("user"));

const auth = getAuth();


const addUserToDB = async (fullName, username, uid) => {
    try {
        const res = await addDoc(usersRef, {
            ...initialState, fullName: fullName, username: username, uid: uid
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
            return res.user;
        } catch (e) { console.log(e) }
    }
)

export const userLogin = createAsyncThunk(
    "user/login",
    async (arg) => {
        try {
            const res = await signInWithEmailAndPassword(auth, arg.email, arg.password);
            localStorage.setItem("uid", JSON.stringify(res.user.uid));
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [userSignUp.fulfilled]: (state, action) => {
            state.email = action.payload.email
            localStorage.setItem("uid", JSON.stringify(action.payload.uid))
        },
        [userLogin.fulfilled]: (state, action) => {
            localStorage.setItem("uid", JSON.stringify(action.payload.uid));
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
        }
    }
});

export default userSlice.reducer;