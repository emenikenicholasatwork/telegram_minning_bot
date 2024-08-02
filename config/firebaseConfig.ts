// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMkn4NRnVPyKiFJIZdEJ68Rx9-kwqfdFQ",
    authDomain: "mining-bot-48179.firebaseapp.com",
    projectId: "mining-bot-48179",
    storageBucket: "mining-bot-48179.appspot.com",
    messagingSenderId: "1068913100428",
    appId: "1:1068913100428:web:480fc8125f8f941ebbdda9",
    measurementId: "G-HL8KDE6519"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);