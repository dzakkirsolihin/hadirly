// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-6WqPug4D0v2mwr9roYvp9YXO4NGO9i8",
  authDomain: "hadirly-702bd.firebaseapp.com",
  projectId: "hadirly-702bd",
  storageBucket: "hadirly-702bd.firebasestorage.app",
  messagingSenderId: "693770904461",
  appId: "1:693770904461:web:0292812b3ff640166553c4",
  measurementId: "G-Y8F80SCXVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };