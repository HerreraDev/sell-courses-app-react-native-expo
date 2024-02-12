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
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123123");
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../assets/logo.jpg")} style={styles.image} />
          <Text style={styles.title}>Iniciar Sesión</Text>

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
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.title5}>
              ¿No tienes una cuenta? Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
