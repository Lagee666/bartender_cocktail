// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC58TlDcuOt-OqSITwG5ehI1AEc066N5jA",
  authDomain: "cocktail-adfa8.firebaseapp.com",
  projectId: "cocktail-adfa8",
  storageBucket: "cocktail-adfa8.appspot.com",
  messagingSenderId: "295930608454",
  appId: "1:295930608454:web:6da9147968b1d9b51bc347",
  measurementId: "G-0XPS44LJRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Success config");