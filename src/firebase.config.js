// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXia2_R61tdYYZV5SUbtqwHLP-jrEl1Fk",
  authDomain: "tvmania-85d22.firebaseapp.com",
  projectId: "tvmania-85d22",
  storageBucket: "tvmania-85d22.appspot.com",
  messagingSenderId: "801544136766",
  appId: "1:801544136766:web:7824a96fa58581e544496f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
