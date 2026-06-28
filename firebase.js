// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
getAuth,
GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY8910KYqA-Fqc650-O_muQZ8BE-FuWI0",
  authDomain: "my-partner-a2c99.firebaseapp.com",
  projectId: "my-partner-a2c99",
  storageBucket: "my-partner-a2c99.firebasestorage.app",
  messagingSenderId: "1083074265867",
  appId: "1:1083074265867:web:ce970034f78b490ac3180e",
  measurementId: "G-MLKY5H9T0V"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {

auth,

db,

provider

};
