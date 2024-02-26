import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import React, { useState, useEffect } from "react";
import styles from "../css-styles/commom-styles";

import Loader from "../components/shared/loader";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/auth-context";
import commonStyles from "../css-styles/commom-styles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    const user = await onLogin(email, password);
    if (user) {
      navigation.navigate("Home");
    }
    setLoading(false);
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleTestLogin = () => {
    setEmail("a@mail.com");
    setPassword("123456");
    handleLogin();
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
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const handleTouchEmail = () => {
    setEmailTouched(true);
  };

  const handleTouchPassword = () => {
    setPasswordTouched(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title3, styles.alignSelfStart, styles["mb-16"]]}>
        Iniciar Sesión
      </Text>

      <TextInput
        style={[
          styles.input,
          emailHasError && emailTouched ? commonStyles.errorMessageInput : "",
        ]}
        placeholder="Correo Electronico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        onEndEditing={handleTouchEmail}
      />

      {emailHasError && emailTouched && (
        <Text style={commonStyles.errorMessage}>
          El Correo Electronico debe contener al menos 2 caracteres y el simbolo
          @
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          passwordHasError && passwordTouched
            ? commonStyles.errorMessageInput
            : "",
        ]}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        onEndEditing={handleTouchPassword}
      />

      {passwordHasError && passwordTouched && (
        <Text style={commonStyles.errorMessage}>
          La contraseña debe contener al menos 6 caracteres
        </Text>
      )}

      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleLogin}
          disabled={emailHasError || passwordHasError || loading}
        >
          <Text style={styles.buttonText}> Ingresar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleSignUp} style={styles["mt-16"]}>
        <Text style={styles.title5}>
          ¿No tienes una cuenta?
          <Text style={styles.accentLink}> Registrarse</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
