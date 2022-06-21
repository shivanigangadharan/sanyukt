import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { getDocs, addDoc } from "@firebase/firestore";
import { usersRef } from "../../firebase";

//logged in user
const initialState = localStorage.getItem("user") === null ? {} : JSON.parse(localStorage.getItem("user"));

const auth = getAuth();

const setUserInLocalStorage = async (uid) => {
    const res = await getDocs(usersRef);
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            localStorage.setItem("user", JSON.stringify({ ...doc.data(), id: doc.id }))
        }
    });
}
const getUser = async (uid) => {
    const res = await getDocs(usersRef);
    var u;
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            u = { ...doc.data(), id: doc.id }
        }
    });
    return u;
}
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

export const authSlice = createSlice({
    name: "user",
    initialState,

    reducers: {

    },
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
            console.log("Now state = ", state)
        },
    }
});

export default authSlice.reducer;
