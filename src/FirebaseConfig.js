// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6NcPS_RnDUJa-1sAg2VwB2gH-FY9LaJI",
  authDomain: "bd-para-react.firebaseapp.com",
  projectId: "bd-para-react",
  storageBucket: "bd-para-react.appspot.com",
  messagingSenderId: "983776417622",
  appId: "1:983776417622:web:68314c0807ee5841e728f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)