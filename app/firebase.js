// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBalQzHNFG0yNz9mi512FQgf_sO4b2ZSm0",
  authDomain: "fiuber-799a1.firebaseapp.com",
  projectId: "fiuber-799a1",
  storageBucket: "fiuber-799a1.appspot.com",
  messagingSenderId: "565324649447",
  appId: "1:565324649447:web:970312be7256f67df5a342",
  measurementId: "G-GELSYQ3BGW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app