import { auth } from "./config";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

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
  console.log(auth.currentUser);

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
      console.error(error.code);
    });
};

export const logOut = () => {
  return signOut(auth);
};
