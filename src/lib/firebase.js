import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chattify-24768.firebaseapp.com",
  projectId: "chattify-24768",
  storageBucket: "chattify-24768.appspot.com",
  messagingSenderId: "500481709444",
  appId: "1:500481709444:web:3cff832ca002de0b4af9d1"
};

const app = initializeApp(firebaseConfig);

console.log(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()