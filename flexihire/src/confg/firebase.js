import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBZ5QbnlUZxEOHuWgwej6J6tu-Bzutr0H0",
  authDomain: "flexihire-8f227.firebaseapp.com",
  projectId: "flexihire-8f227",
  storageBucket: "flexihire-8f227.appspot.com",
  messagingSenderId: "923720855136",
  appId: "1:923720855136:web:d9a66e7dac2523b9555d05",
  measurementId: "G-6CZKK6NC2X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
