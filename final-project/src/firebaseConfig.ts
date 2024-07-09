// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8bn7KSZVipoqrdSYNqIQ8HXQF_u4OhRU",
  authDomain: "final-project-e6810.firebaseapp.com",
  projectId: "final-project-e6810",
  storageBucket: "final-project-e6810.appspot.com",
  messagingSenderId: "367799250293",
  appId: "1:367799250293:web:6f7901ce17a169ab84773c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function singInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function singOutOfGoogle(): void {
  auth.signOut();
}

export const storage = getStorage(app);
