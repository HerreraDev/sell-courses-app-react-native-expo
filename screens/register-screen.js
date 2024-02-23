import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../css-styles/commom-styles";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/config";
import Loader from "../components/shared/loader";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/auth-context";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [firstnameHasError, setFirstnameHasError] = useState(false);
  const [firstnameTouched, setFirstnameTouched] = useState(false);

  const [lastname, setLastname] = useState("");
  const [lastnameHasError, setLastnameHasError] = useState(false);
  const [lastnameTouched, setLastnameTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { onRegister } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await onRegister(email, password, firstname);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          displayName: firstname,
          lastName: lastname,
          email: email,
          uid: user.uid,
          photoUrl: "",
          isPremium: false,
        });

        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const validateForm = () => {
    if (email && email.includes("@") && email.length > 2) {
      setEmailHasError(false);
    } else {
      setEmailHasError(true);
    }

    if (password && password.length > 5) {
      setPasswordHasError(false);
    } else {
      setPasswordHasError(true);
    }

    if (firstname && firstname.length > 2) {
      setFirstnameHasError(false);
    } else {
      setFirstnameHasError(true);
    }

    if (lastname && lastname.length > 2) {
      setLastnameHasError(false);
    } else {
      setLastnameHasError(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [email, password, firstname, lastname]);

  const handleTouchEmail = () => {
    setEmailTouched(true);
  };

  const handleTouchPassword = () => {
    setPasswordTouched(true);
  };

  const handleTouchFirstname = () => {
    setFirstnameTouched(true);
  };

  const handleTouchLastname = () => {
    setLastnameTouched(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.title3, styles.alignSelfStart, styles["mb-16"]]}>
          Registrarse
        </Text>

        <TextInput
          style={[
            styles.input,
            firstnameHasError && firstnameTouched
              ? styles.errorMessageInput
              : "",
          ]}
          placeholder="Nombre"
          value={firstname}
          onChangeText={setFirstname}
          onEndEditing={handleTouchFirstname}
        />
        {firstnameHasError && firstnameTouched && (
          <Text style={styles.errorMessage}>
            El nombre debe contener al menos 2 caracteres
          </Text>
        )}

        <TextInput
          style={[
            styles.input,
            lastnameHasError && lastnameTouched ? styles.errorMessageInput : "",
          ]}
          placeholder="Apellido"
          value={lastname}
          onChangeText={setLastname}
          onEndEditing={handleTouchLastname}
        />
        {lastnameHasError && lastnameTouched && (
          <Text style={styles.errorMessage}>
            El apellido debe contener al menos 2 caracteres
          </Text>
        )}

        <TextInput
          style={[
            styles.input,
            emailHasError && emailTouched ? styles.errorMessageInput : "",
          ]}
          placeholder="Correo Electronico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onEndEditing={handleTouchEmail}
        />
        {emailHasError && emailTouched && (
          <Text style={styles.errorMessage}>
            El Correo Electronico debe contener al menos 2 caracteres y el
            simbolo @
          </Text>
        )}

        <TextInput
          style={[
            styles.input,
            passwordHasError && passwordTouched ? styles.errorMessageInput : "",
          ]}
          placeholder="Contraseña"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          onEndEditing={handleTouchPassword}
        />

        {passwordHasError && passwordTouched && (
          <Text style={styles.errorMessage}>
            La contraseña debe contener al menos 6 caracteres
          </Text>
        )}

        {loading ? (
          <Loader />
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleLogin} style={styles["mt-16"]}>
          <Text style={styles.title5}>
            ¿Ya estás registrado?
            <Text style={styles.accentLink}> Inicia Sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
