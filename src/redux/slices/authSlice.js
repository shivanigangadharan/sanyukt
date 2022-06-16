import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getDocs, addDoc } from "@firebase/firestore";
import { usersRef } from "../../firebase";

//logged in user
const initialState = {
    fullName: "",
    username: "",
    posts: [],
    bookmarks: [],
    likes: [],
    followers: [],
    following: [],
    bio: "Enter a short and suitable bio for yourself.",
    portfolioURL: "enteryourPortfolio@url.com",
    uid: null,
    profilepic: "https://res.cloudinary.com/dqpanoobq/image/upload/v1654634630/Social%20Media/defaultImg_j01icd.png",
};

const auth = getAuth();

const setUserInLocalStorage = async (uid) => {
    const res = await getDocs(usersRef);
    res.forEach((doc) => {
        if (doc.data().uid === uid) {
            localStorage.setItem("user", JSON.stringify({ ...doc.data(), id: doc.id }))
        }
    });
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

export const getUserSignUp = createAsyncThunk(
    "user/signup",
    async (arg) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, arg.email, arg.password);
            addUserToDB(arg.fullName, arg.username, res.user.uid)
            return res.user;
        } catch (e) { console.log(e) }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

    },
    extraReducers: {
        [getUserSignUp.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getUserSignUp.fulfilled]: (state, action) => {
            state.email = action.payload.email
            localStorage.setItem("uid ", JSON.stringify(action.payload.uid))
        },
        [getUserSignUp.rejected]: (state, { payload }) => {
            state.loading = false
        },
    }
});

export default authSlice.reducer;
