import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const MP_ACCESS_TOKEN =
  "APP_USR-2392044053665355-022222-24e347641a0b96fc9ed2538760ace7d0-390641480";

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

export { db, app, auth, MP_ACCESS_TOKEN };
