// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ---------- REPLACE THESE PLACEHOLDERS WITH VALUES FROM FIREBASE CONSOLE ----------
const firebaseConfig = {
  apiKey: "AIzaSyCbMiOHe0QGNmjG9nU6C1QShp2yhmMlnPo",
  authDomain: "classify-c375b.firebaseapp.com",
  projectId: "classify-c375b",
  storageBucket: "classify-c375b.firebasestorage.app",
  messagingSenderId: "225163677808",
  appId: "1:225163677808:web:4c92036d23cfe186bd24b5"
};
// -------------------------------------------------------------------------------

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export services you will use in your app:
export const db = getFirestore(app);
export const auth = getAuth(app);
