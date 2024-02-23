import { auth, db } from "./config";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const signUp = async (email, password, firstname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: firstname,
    });
    return user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Email en uso");
    } else if (error.code === "auth/weak-password") {
      Alert.alert("La contraseña debe tener al menos 6 caracteres de longitud");
    }
    console.error(error);
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;

  try {
    await user.sendEmailVerification().then(() => {
      showEmailAlert(user.email);
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};

const showEmailAlert = (email) => {
  Alert.alert(email);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Email o contraseña incorrectas");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("El formato del email es incorrecto");
      }
      console.error(error.code);
    });
};

export const logOut = () => {
  return signOut(auth);
};

export const getUserIsPremium = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let isPremium = false;
    let auxUser = {};
    querySnapshot.forEach((doc) => {
      let auxData = doc.data();
      if (auxData.uid === userId) {
        isPremium = auxData.isPremium;
        auxUser = auxData;
      }
    });

    if (isPremium) {
      const response = await checkSuscriptionPeriod(auxUser);
      if (response === false) {
        return false;
      }
    }
    return isPremium;
  } catch (error) {
    console.error(error);
  }
};

export const checkSuscriptionPeriod = async (auxUser) => {
  // Supongamos que has obtenido el objeto con el timestamp de Firebase
  const firebaseTimestamp = auxUser.hasBecomePremium;
  // Convierte el timestamp de Firebase a una fecha de JavaScript
  const premiumDate = new Date(
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000
  );
  // Obtén la fecha actual
  const currentDate = new Date();
  // Calcula la diferencia en milisegundos entre las fechas
  const differenceInMillis = currentDate - premiumDate;
  // Convierte la diferencia a días
  const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  // Verifica si han pasado al menos 30 días
  if (differenceInDays >= 30) {
    try {
      const userRef = doc(db, "users", auxUser.uid);

      await updateDoc(userRef, {
        isPremium: false,
        hasBecomePremium: serverTimestamp(),
      });

      Alert.alert(
        "Suscripción vencida",
        "Se ha vencido tu suscripción mensual, por favor vuelve a suscribirte"
      );
      return false;
    } catch (error) {
      return true;
    }
  }
};
