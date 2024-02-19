import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5fB9y-Mj_xMnLTsMst1qVsS0V-6Fdl58",
  authDomain: "despierta-tu-alma-universal.firebaseapp.com",
  projectId: "despierta-tu-alma-universal",
  storageBucket: "despierta-tu-alma-universal.appspot.com",
  messagingSenderId: "332576914544",
  appId: "1:332576914544:web:4d68e4b474df302c0b08b5",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, app, auth };
