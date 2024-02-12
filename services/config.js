import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDShIGTH81mmx0bjEDWiOEP6kFyStkR-WY",
  authDomain: "app-juli-backend.firebaseapp.com",
  projectId: "app-juli-backend",
  storageBucket: "app-juli-backend.appspot.com",
  messagingSenderId: "944658668006",
  appId: "1:944658668006:web:f7802cd6b11c63ca22de27",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, app, auth };
