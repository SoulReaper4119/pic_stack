//jshint esversion:8
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase' ;

const firebaseApp =  firebase.initializeApp({
  apiKey: "AIzaSyA5fHmed6RQGswWFAq_AaS5G-HLbHfezmE",
  authDomain: "insta-grab-cf6d5.firebaseapp.com",
  projectId: "insta-grab-cf6d5",
  storageBucket: "insta-grab-cf6d5.appspot.com",
  messagingSenderId: "1069459260883",
  appId: "1:1069459260883:web:c4270f8a393a45b37a5b26",
  measurementId: "G-BHP04VXXN7"
});

const db = firebaseApp.firestore();
const auth =  firebase.auth();
const storage = firebase.storage();

export {db, auth, storage };
