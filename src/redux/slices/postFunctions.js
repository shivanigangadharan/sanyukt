import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc, arrayUnion, doc, arrayRemove, increment } from "@firebase/firestore";
import { db } from "../../firebase";

export const addBookmark = createAsyncThunk(
    "post/addBookmark", async (arg) => {
        try {
            const userRef = doc(db, `users/${arg.userID}`);
            const res = await updateDoc(userRef, {
                bookmarks: arrayUnion(arg.id)
            });
            const localUser = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({ ...localUser, bookmarks: [...localUser.bookmarks, arg.id] }));
            return arg.id;
        }
        catch (e) {
            console.log(e);
        }
    });

export const removeBookmark = createAsyncThunk(
    "post/removeBookmark", async (arg) => {
        try {
            const userRef = doc(db, `users/${arg.userID}`);
            const res = await updateDoc(userRef, {
                bookmarks: arrayRemove(arg.id)
            });
            const localUser = JSON.parse(localStorage.getItem("user"));
            const filteredBookmarks = localUser.bookmarks.filter((pid) => pid !== arg.id);
            localStorage.setItem("user", JSON.stringify({ ...localUser, bookmarks: filteredBookmarks }));
            return filteredBookmarks;
        } catch (e) {
            alert("Unable to remove this bookmark.");
            console.log(e);
        }
    });

export const addLike = createAsyncThunk(
    "post/addLike", async (arg) => {
        try {
            const userRef = doc(db, `users/${arg.userID}`);
            const res = await updateDoc(userRef, {
                likes: arrayUnion(arg.id)
            })
            const localUser = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({ ...localUser, likes: [...localUser.likes, arg.id] }));
            return arg.id;
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const removeLike = createAsyncThunk(
    "post/removeLike", async (arg) => {
        try {
            const userRef = doc(db, `users/${arg.userID}`);
            const res = await updateDoc(userRef, {
                likes: arrayRemove(arg.id)
            });
            const localUser = JSON.parse(localStorage.getItem("user"));
            const filteredlikes = localUser.likes.filter((pid) => pid !== arg.id);
            localStorage.setItem("user", JSON.stringify({ ...localUser, likes: filteredlikes }));
            return filteredlikes;
        }
        catch (e) {
            alert("Unable to remove this bookmark.");
            console.log(e);
        }
    }
)

export const addPost = createAsyncThunk(
    "post/addPost", async (arg) => {
        try {
            const localUser = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({ ...localUser, posts: arg.posts }));
            return arg.posts;
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const incrementLikes = createAsyncThunk(
    "post/incrementLikes", async (arg) => {
        try {
            const postRef = doc(db, `posts/${arg.id}`);
            const res = await updateDoc(postRef, {
                likes: increment(1)
            });
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const decrementLikes = createAsyncThunk(
    "post/decrementLikes", async (arg) => {
        try {
            const postRef = doc(db, `posts/${arg.id}`);
            const res = await updateDoc(postRef, {
                likes: increment(-1)
            });
        }
        catch (e) {
            console.log(e);
        }
    }
)
