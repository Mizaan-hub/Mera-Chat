import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "mera-chat-69.firebaseapp.com",
    projectId: "mera-chat-69",
    storageBucket: "mera-chat-69.appspot.com",
    messagingSenderId: "115374613165",
    appId: "1:115374613165:web:c450c0cf6ff346377a1c24"
};

const app = initializeApp(firebaseConfig);

console.log(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()