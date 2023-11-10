import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6xfcJi6UAwrEK1VfjE1LbZUrxJPHhJKU",
  authDomain: "react-netflix-clone-e33b5.firebaseapp.com",
  projectId: "react-netflix-clone-e33b5",
  storageBucket: "react-netflix-clone-e33b5.appspot.com",
  messagingSenderId: "995988844299",
  appId: "1:995988844299:web:7d088b63f78475396efc0e",
  measurementId: "G-VY0R0TFTZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);