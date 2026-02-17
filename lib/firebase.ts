import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDRY3VahIdMZWXEjc8a7MIn8FGR4vCSep8",
    authDomain: "portafoliobd-f73d1.firebaseapp.com",
    projectId: "portafoliobd-f73d1",
    storageBucket: "portafoliobd-f73d1.firebasestorage.app",
    messagingSenderId: "430500043582",
    appId: "1:430500043582:web:9999dece538553ca996a6f",
    measurementId: "G-VV8W39D9NL",
    databaseURL: "https://portafoliobd-f73d1-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics only on client side
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { analytics };
