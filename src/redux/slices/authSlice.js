import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { getDocs, addDoc, updateDoc, arrayUnion, doc, arrayRemove } from "@firebase/firestore";
import { usersRef, db } from "../../firebase";

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

export const authSlice = createSlice({
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
        }

    }
});

export default authSlice.reducer;
