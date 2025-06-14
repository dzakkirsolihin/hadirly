// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMSnAz0cUyna1R9YRSNXqyICWCcJZK1_4",
  authDomain: "absensi-c55e7.firebaseapp.com",
  projectId: "absensi-c55e7",
  storageBucket: "absensi-c55e7.firebasestorage.app",
  messagingSenderId: "515568133881",
  appId: "1:515568133881:web:8f20d839dc0ced3831a428",
  measurementId: "G-DEW9ZC9SHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
