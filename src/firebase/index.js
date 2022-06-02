import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, getDoc, getDocsFromCache, doc, query, where
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLtshkN4MInhILjLsV_t-JWRRr0h-YDek",
    authDomain: "social-media-cc749.firebaseapp.com",
    projectId: "social-media-cc749",
    storageBucket: "social-media-cc749.appspot.com",
    messagingSenderId: "478260356785",
    appId: "1:478260356785:web:49bda248f2d508e8c82490",
    measurementId: "G-05YK8EDRK8"
};

//initializing firebase app - connecting to our project
initializeApp(firebaseConfig);

//initialize services - connecting to database
export const db = getFirestore();

// reference to a particular collection, here, posts.
export const postsRef = collection(db, "posts");
export const usersRef = collection(db, "users");

