// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// DANGER: DO NOT SHARE CONFIG IN PUBLIC
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5zTF4THvQSBdPhZAUnt66x32u5jQDrh8",
  authDomain: "email-password-auth-c8169.firebaseapp.com",
  projectId: "email-password-auth-c8169",
  storageBucket: "email-password-auth-c8169.firebasestorage.app",
  messagingSenderId: "659336188313",
  appId: "1:659336188313:web:76f5a150874db087d54308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);