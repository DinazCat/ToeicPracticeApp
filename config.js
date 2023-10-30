
const { initializeApp } = require('firebase/app')
const firebaseConfig = {
  apiKey: "AIzaSyBiVHrN1tvAs4GWulf3LWsnTktj9kvow4U",
  authDomain: "toeicpracticeapp-9dc19.firebaseapp.com",
  projectId: "toeicpracticeapp-9dc19",
  storageBucket: "toeicpracticeapp-9dc19.appspot.com",
  messagingSenderId: "235184996000",
  appId: "1:235184996000:web:d94e0997ceb6179a2e53c5"
};

// Initialize Firebase
const firebase= initializeApp(firebaseConfig);
//  const db = firebase.firestore()
//  const user = db.collection("Users")
module.exports = firebase;