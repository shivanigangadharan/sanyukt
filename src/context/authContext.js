import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import { addDoc } from '@firebase/firestore';
import { usersRef } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [encodedToken, setEncodedToken] = useState(localStorage.getItem("token"));
    const [uid, setUid] = useState(localStorage.getItem("uid"));
    const auth = getAuth();

    useEffect(() => {
        console.log("User token in UE of authContext : ", uid);
    });

    const addUserToDB = async (fullName, username, uid) => {
        try {
            const res = await addDoc(usersRef, {
                fullName: fullName,
                username: username,
                posts: [],
                bookmarks: [],
                likes: [],
                followers: [],
                following: [],
                uid: uid
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const SignupUser = async (fullName, username, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created: ", res.user);
            setUser(res.user);
            setEncodedToken(res.user.accessToken);
            localStorage.setItem("token", JSON.stringify(res.user.accessToken));
            localStorage.setItem("uid", JSON.stringify(res.user.uid));

            //adding user details to db
            addUserToDB(fullName, username, res.user.uid);

            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

    const LoginUser = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            setEncodedToken(res.user.accessToken);
            localStorage.setItem("token", JSON.stringify(res.user.accessToken));
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    const LogoutUser = async () => {
        try {
            const res = await signOut(auth);
            console.log("User has signed out");
            localStorage.removeItem("token");
            setUser(null);
            localStorage.removeItem("uid");
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    const authChangeHandler = async () => {
        const res = await onAuthStateChanged(auth, (user) => {
            console.log("User: ", user);
        })
    };

    return (
        <AuthContext.Provider value={{ user, setUser, encodedToken, setEncodedToken, SignupUser, LoginUser, LogoutUser, uid }}>
            {children}
        </AuthContext.Provider>
    )
}