import {
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";
import styles from "../css-styles/commom-styles";

import Loader from "../components/loader";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/auth-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        style={styles.input}
        placeholder="Correo Electronico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
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
