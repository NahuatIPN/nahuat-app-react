// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_MOCK_FIREBASE_KEY,
  authDomain: "nahuatapp.firebaseapp.com",
  projectId: process.env.REACT_APP_MOCK_FIREBASE_PROJECT_ID,
  storageBucket: "nahuatapp.appspot.com",
  messagingSenderId: process.env.REACT_APP_MOCK_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_MOCK_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MOCK_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
