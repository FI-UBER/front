// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxQaGWru2G2d-Tl--GC3fkGYIGbQahbA",
  authDomain: "fiuber-975cb.firebaseapp.com",
  projectId: "fiuber-975cb",
  storageBucket: "fiuber-975cb.appspot.com",
  messagingSenderId: "765549571903",
  appId: "1:765549571903:web:332a187eeaedebdc3a2d8a",
  measurementId: "G-1N5PEHW53E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export default {app , db};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);