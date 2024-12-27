// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "planner-app-29792.firebaseapp.com",
  projectId: "planner-app-29792",
  storageBucket: "planner-app-29792.firebasestorage.app",
  messagingSenderId: "1054863937704",
  appId: "1:1054863937704:web:e759d5fd530157c977729d",
  measurementId: "G-TEZCHNTX5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);
export const auth = getAuth(app);

// Firebase Storage
export const storage = getStorage(app);
