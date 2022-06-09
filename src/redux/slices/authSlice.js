import { createSlice } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getDocs, addDoc } from "@firebase/firestore";
import { usersRef } from "../../firebase";



const emptyUser = {
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
}
//logged in user
const initialState = emptyUser;

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
            ...emptyUser, fullName: fullName, username: username, uid: uid
        });
        setUserInLocalStorage(uid);
    }
    catch (e) {
        console.log(e);
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,

    //this is the user reducers (all reducer functions)
    reducers: {
        signUp: async (state, action) => {
            try {
                const res = await createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password);
                // addUserToDB(action.payload.fullName, action.payload.username, res.user.uid);
                state.uid = "kphs6H";
                state.fullName = action.payload.fullName;
                state.username = action.payload.username;
            } catch (e) { console.log(e) }
            // console.log("localStorg: ", JSON.parse(localStorage.getItem("user")))
        }
    }
});

export const { signUp } = authSlice.actions;

export default authSlice.reducer;
