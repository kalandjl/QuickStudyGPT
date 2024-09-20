// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_lPFAZzyV-Q6iw9GnDufZC6x3OZgCoQA",
  authDomain: "quickstudygpt-d1fac.firebaseapp.com",
  projectId: "quickstudygpt-d1fac",
  storageBucket: "quickstudygpt-d1fac.appspot.com",
  messagingSenderId: "434467136928",
  appId: "1:434467136928:web:0e5b95c3e8a0b37b6f70c5",
  measurementId: "G-E34GZDRN0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);