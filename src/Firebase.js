// Import Firebase modules
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For Firebase storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQx13EiA6kUmbI4008LrpE91c3Ilg4mks",
  authDomain: "lease-website-11a4e.firebaseapp.com",
  projectId: "lease-website-11a4e",
  storageBucket: "lease-website-11a4e.appspot.com",
  messagingSenderId: "659734175452",
  appId: "1:659734175452:web:e610b43de4351f334d9e19",
  measurementId: "G-8N4RFP2ZK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app); // Firestore instance for Login.js
const db = getFirestore(app); // Firestore instance for other pages
const storage = getStorage(app);

// Export different Firestore instances
export { analytics, app, auth, db, firestore, storage };

