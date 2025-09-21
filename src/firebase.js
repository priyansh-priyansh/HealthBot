import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDILJCOVwRgC2q8TNeEPtKKW4D9GQ0pxNM",
  authDomain: "chatbot-14ffa.firebaseapp.com",
  projectId: "chatbot-14ffa",
  storageBucket: "chatbot-14ffa.firebasestorage.app",
  messagingSenderId: "818719636498",
  appId: "1:818719636498:web:1b575e480fd102279b6ccb",
  measurementId: "G-7VQBYRX4LQ",
};

const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // ignore analytics init errors (e.g., when in unsupported env)
    });
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
