// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9zh5ZrbnWCFgPmVhOWGmxifEAYLtgSDc",
    authDomain: "fir-dev-e9d30.firebaseapp.com",
    projectId: "fir-dev-e9d30",
    storageBucket: "fir-dev-e9d30.appspot.com",
    messagingSenderId: "544574969467",
    appId: "1:544574969467:web:7b86e9514f9b82665774de",
    measurementId: "G-7SXQZVM7R5",
};
// Initialize Firebase

if (!getApps()?.length) {
    initializeApp(firebaseConfig);
}
export const db = getFirestore();
export const functions = getFunctions();
export const auth = getAuth();
export const storage = getStorage();
