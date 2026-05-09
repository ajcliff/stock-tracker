import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNZMJY30v-IDvn0bzN5Zuf5hkJ-WM9hdA",
  authDomain: "stocksalestracker.firebaseapp.com",
  projectId: "stocksalestracker",
  storageBucket: "stocksalestracker.firebasestorage.app",
  messagingSenderId: "1006968647903",
  appId: "1:1006968647903:web:fc701c7aae051518e3f96a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);