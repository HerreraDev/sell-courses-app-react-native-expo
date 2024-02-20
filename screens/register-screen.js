import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../css-styles/commom-styles";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/config";
import Loader from "../components/shared/loader";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/auth-context";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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

  return (
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
        style={styles.input}
        placeholder="Nombre"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastname}
        onChangeText={setLastname}
      />
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
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
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
  );
};

export default RegisterScreen;
