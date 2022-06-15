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
    loading: false,
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
            const res = await createUserWithEmailAndPassword(auth, "unique@gmail.com", "unique123");
            console.log("Signed up! ", res.user);
            return res.user;
        } catch (e) { console.log(e) }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,

    //this is the user reducers (all reducer functions)
    reducers: {
        // signUp: async (state, action) => {
        //     try {
        //         const res = await createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password);
        //         addUserToDB(action.payload.fullName, action.payload.username, res.user.uid);
        //         // state.uid = res.user.uid;
        //         state.fullName = action.payload.fullName;
        //         state.username = action.payload.username;
        //         console.log('state - ', state.uid, state.username, state.posts)
        //         return { ...state, uid: res.user.uid }
        //     } catch (e) { console.log(e) }
        //     // console.log("localStorg: ", JSON.parse(localStorage.getItem("user")))
        // }
    },
    extraReducers: {
        [getUserSignUp.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getUserSignUp.fulfilled]: (state, action) => {
            state.email = action.payload.email
            localStorage.setItem("user ", JSON.stringify(action.payload.email))
        },
        [getUserSignUp.rejected]: (state, { payload }) => {
            state.loading = false
        },
    }
});

// export const { getUserSignUp } = authSlice.actions;

export default authSlice.reducer;
