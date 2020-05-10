import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBjUNNWXlgzSaxr0FdNMDAM5uv8Q5-WVJo",
    authDomain: "blogposts-d0e3a.firebaseapp.com",
    databaseURL: "https://blogposts-d0e3a.firebaseio.com",
    projectId: "blogposts-d0e3a",
    storageBucket: "blogposts-d0e3a.appspot.com",
    messagingSenderId: "907066002738",
    appId: "1:907066002738:web:94c716ddcb879c71d49b2b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database().ref("/posts")
